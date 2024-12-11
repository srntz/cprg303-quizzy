const cors = require("cors");
const express = require("express");
const admin = require("firebase-admin");
const functions = require("firebase-functions");

// Initialize Firebase Admin and Firestore
admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Endpoint: User Login
app.post("/login", async (req, res) => {
    const email = req.body.email;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        const usersRef = db.collection("user_profiles");
        const snapshot = await usersRef.where("email", "==", email).get();

        if (snapshot.empty) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const user = snapshot.docs[0].data();
        return res.status(200).json({ id: snapshot.docs[0].id, email: user.email });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});



// Endpoint: Get User Profile
app.get("/user-profile", async (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ error: "Missing required parameter: userId" });
    }

    try {
        const userDoc = await db.collection("user_profiles").doc(userId).get();

        if (!userDoc.exists) {
            return res.status(404).json({ error: "User not found" });
        }

        const userData = userDoc.data();
        return res.status(200).json({
            id: userDoc.id,
            avatar: userData?.avatar,
            username: userData?.username,
            email: userData?.email,
            country: userData?.country,
            quizzes_played: userData?.quizzes_played || [],
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Endpoint: Get Quiz with Questions
app.get("/quiz-with-questions", async (req, res) => {
    const quizId = req.query.quizId;

    if (!quizId) {
        return res.status(400).json({ error: "Missing required parameter: quizId" });
    }

    try {
        // Fetch the specific quiz by ID
        const quizDoc = await db.collection("quizzes").doc(quizId).get();

        if (!quizDoc.exists) {
            return res.status(404).json({ error: "Quiz not found" });
        }

        const quizData = quizDoc.data();

        // Extract question IDs from the quiz document
        const questionsArray = quizData.questions || [];

        // Fetch questions corresponding to the question IDs
        let questions = [];
        if (questionsArray.length > 0) {
            const questionIds = questionsArray.map((q) => q.id);
            const questionsSnapshot = await db
                .collection("questions")
                .where("__name__", "in", questionIds)
                .get();

            questions = questionsSnapshot.docs.map((questionDoc) => ({
                id: questionDoc.id,
                ...questionDoc.data(),
            }));
        }

        return res.status(200).json({
            id: quizDoc.id,
            ...quizData,
            questions,
        });
    } catch (error) {
        console.error("Error fetching quiz with questions:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


// Endpoint: Get Quiz Categories
app.get("/quiz-categories", async (_req, res) => {
    try {
        const categoriesSnapshot = await db.collection("quiz_categories").get();
        const categories = categoriesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Endpoint: Get Questions
app.get("/questions", async (req, res) => {
    const quizId = req.query.quizId;

    if (!quizId) {
        return res.status(400).json({ error: "Missing required parameter: quizId" });
    }

    try {
        // Reference to the quizzes collection
        const quizRef = db.collection("quizzes").doc(quizId);
        const quizDoc = await quizRef.get();

        if (!quizDoc.exists) {
            return res.status(404).json({ error: "Quiz not found" });
        }

        // Extract question IDs from the quiz document
        const questionsArray = quizDoc.data().questions;

        if (!Array.isArray(questionsArray) || questionsArray.length === 0) {
            return res.status(404).json({ error: "No questions found for this quiz" });
        }

        // Extract the `id` field from each question object
        const questionIds = questionsArray.map((question) => question.id);

        // Fetch all questions from the questions collection using the question IDs
        const questionsSnapshot = await db.collection("questions")
            .where("__name__", "in", questionIds)
            .get();

        if (questionsSnapshot.empty) {
            return res.status(404).json({ error: "No matching questions found" });
        }

        // Map the question documents to a JSON response
        const questions = questionsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return res.status(200).json(questions);
    } catch (error) {
        console.error("Error fetching questions:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});


// Endpoint: Get Leaderboards
app.get("/leaderboards", async (_req, res) => {
    try {
        const leaderboardsSnapshot = await db.collection("leaderboards").get();
        const leaderboards = leaderboardsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return res.status(200).json(leaderboards);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Endpoint: Get Popular Quizzes
app.get("/popular-quizzes", async (_req, res) => {
    try {
        const popularQuizzesSnapshot = await db
            .collection("quizzes")
            .orderBy("play_count", "desc")
            .limit(5)
            .get();
        const popularQuizzes = popularQuizzesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return res.status(200).json(popularQuizzes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Endpoint: Get Quizzes by Category
app.get("/quizzes-by-category", async (req, res) => {
    const categoryId = req.query.categoryId;

    if (!categoryId) {
        return res.status(400).json({ error: "Missing required parameter: categoryId" });
    }

    try {
        const quizzesSnapshot = await db.collection("quizzes").where("category_id", "==", categoryId).get();

        if (quizzesSnapshot.empty) {
            return res.status(404).json({ error: "No quizzes found for the given category" });
        }

        const quizzes = quizzesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return res.status(200).json(quizzes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Adapt Express App to Firebase Function (1st Gen)
exports.api = functions.https.onRequest(app);
