import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database"; 
const firebaseConfig = {
  apiKey: "AIzaSyAO6oW8lBTP3l8oePvIjKV-D9aoDIuy0iA",
  authDomain: "songtrivia-b9439.firebaseapp.com",
  projectId: "songtrivia-b9439",
  storageBucket: "songtrivia-b9439.firebasestorage.app",
  messagingSenderId: "945747242491",
  appId: "1:945747242491:web:39c0ced3195a527ce76f5e",
  measurementId: "G-WTW5XD4P64"
};


const app = initializeApp(firebaseConfig);


const db = getDatabase(app);


export async function saveTopScore(email, topScore) {
  try {
   
    const userScoreRef = ref(db, `users/${email.replace(/\./g, '_')}/topScore`); 
    

    await set(userScoreRef, {
      score: topScore,
      lastUpdated: Date.now(), 
    });
    
    console.log("Top score saved for:", email);
  } catch (error) {
    console.error("Error saving top score:", error);
  }
}


export async function getTopScore(email) {
  try {

    const dbRef = ref(db);
    

    const snapshot = await get(child(dbRef, `users/${email.replace(/\./g, '_')}`)); 

  
    if (snapshot.exists()) {
      const userData = snapshot.val();
      
      return userData.topScore ? userData.topScore.score : 0; 
    } else {
      console.log("No score found for:", email);
      return 0; 
    }
  } catch (error) {
    console.error("Error getting top score:", error);
    return 0; 
  }
}
