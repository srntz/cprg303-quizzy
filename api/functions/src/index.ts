import * as cors from "cors";
import * as express from "express";
import { Request, Response } from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

// Initialize Firebase Admin and Firestore
admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));

// Endpoint: User Login
app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const usersRef = db.collection("users");
    const snapshot = await usersRef
      .where("email", "==", email)
      .where("password", "==", password)
      .get();

    if (snapshot.empty) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = snapshot.docs[0].data();
    return res.status(200).json({ id: snapshot.docs[0].id, email: user.email });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
});

// Endpoint: Get User Profile
app.get("/user-profile", async (req: Request, res: Response) => {
  const userId = req.query.userId as string;

  try {
    const userDoc = await db.collection("users").doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = userDoc.data();
    return res.status(200).json({
      id: userDoc.id,
      username: userData?.username,
      email: userData?.email,
      country: userData?.country,
      quizzes_played: userData?.quizzes_played || [],
    });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
});

// Endpoint: Get Quiz Categories
app.get("/quiz-categories", async (req: Request, res: Response) => {
  try {
    const categoriesSnapshot = await db.collection("quiz_categories").get();
    const categories = categoriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
});

// Endpoint: Get Questions
app.get("/questions", async (req: Request, res: Response) => {
  const categoryId = req.query.categoryId as string;

  try {
    const questionsRef = db.collection("questions");
    const snapshot = await questionsRef.where("category_id", "==", categoryId).get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "No questions found for the given category" });
    }

    const questions = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return res.status(200).json(questions);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
});

// Endpoint: Get Leaderboards
app.get("/leaderboards", async (req: Request, res: Response) => {
  try {
    const leaderboardsSnapshot = await db.collection("leaderboards").get();
    const leaderboards = leaderboardsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(leaderboards);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
});

// Endpoint: Get Popular Quizzes
app.get("/quiz", async (req: Request, res: Response) => {
  try {
    const popularQuizzesSnapshot = await db.collection("quizzes").orderBy("play_count", "desc").limit(5).get();
    const popularQuizzes = popularQuizzesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(popularQuizzes);
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
});

// Adapt Express App to Firebase Function
exports.api = functions.https.onRequest((req, res) => {
  app(req, res); // Explicitly pass request and response objects
});
