import firebase_admin
from firebase_admin import credentials, firestore
import os
import json

# Initialize Firebase Admin SDK
cred = credentials.Certificate("service-account-file.json")  # Adjust path if needed
firebase_admin.initialize_app(cred)

# Firestore client
db = firestore.client()

# Folder containing JSON files
DATA_FOLDER = "data"

# Function to populate a Firestore collection from a JSON file
def populate_from_json(collection_name, json_file):
    collection_ref = db.collection(collection_name)

    with open(json_file, "r") as file:
        data = json.load(file)
        for item in data:
            doc_id = str(item.pop("id", None))  # Use 'id' as document ID if available
            if doc_id:
                collection_ref.document(doc_id).set(item)
            else:
                collection_ref.add(item)

    print(f"Populated '{collection_name}' collection successfully!")

# Map collections to their respective JSON files
collections = {
    "user_profiles": "user_profiles.json",
    "quiz_categories": "quiz_categories.json",
    "questions": "questions.json",
    "leaderboards": "leaderboards.json",
    "quizzes": "quizzes.json",
}

# Populate all collections
for collection_name, json_file in collections.items():
    file_path = os.path.join(DATA_FOLDER, json_file)
    if os.path.exists(file_path):
        populate_from_json(collection_name, file_path)
    else:
        print(f"File '{file_path}' not found. Skipping '{collection_name}' collection.")
