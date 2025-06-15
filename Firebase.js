import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database"; // Import Realtime Database functions

const firebaseConfig = {
  apiKey: "AIzaSyAO6oW8lBTP3l8oePvIjKV-D9aoDIuy0iA",
  authDomain: "songtrivia-b9439.firebaseapp.com",
  projectId: "songtrivia-b9439",
  storageBucket: "songtrivia-b9439.firebasestorage.app",
  messagingSenderId: "945747242491",
  appId: "1:945747242491:web:39c0ced3195a527ce76f5e",
  measurementId: "G-WTW5XD4P64"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const db = getDatabase(app);

/**
 * Saves the user's top score to Firebase Realtime Database.
 * Data will be stored under 'users/{email}/topScore'.
 * @param {string} email - The user's email, used as a key in the database path.
 * @param {number} topScore - The new top score to save.
 */
export async function saveTopScore(email, topScore) {
  try {
    // Create a reference to the specific user's topScore path
    const userScoreRef = ref(db, `users/${email.replace(/\./g, '_')}/topScore`); // Replace '.' in email for valid path
    
    // Set the top score. This will overwrite any existing value at this path.
    await set(userScoreRef, {
      score: topScore,
      lastUpdated: Date.now(), // Store a timestamp of the last update
    });
    
    console.log("Top score saved for:", email);
  } catch (error) {
    console.error("Error saving top score:", error);
  }
}


export async function getTopScore(email) {
  try {
    // Create a reference to the "users" node
    const dbRef = ref(db);
    
    // Get a snapshot of the user's data
    const snapshot = await get(child(dbRef, `users/${email.replace(/\./g, '_')}`)); // Replace '.' in email for valid path

    // Check if the snapshot exists and contains data
    if (snapshot.exists()) {
      const userData = snapshot.val();
      // Return the topScore, or 0 if the field doesn't exist
      return userData.topScore ? userData.topScore.score : 0; // Access the nested 'score' property
    } else {
      console.log("No score found for:", email);
      return 0; // Return 0 if the user data does not exist
    }
  } catch (error) {
    console.error("Error getting top score:", error);
    return 0; // Return 0 in case of any error
  }
}
