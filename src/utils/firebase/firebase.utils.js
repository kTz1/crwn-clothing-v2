import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC97G0BzYvZbfuR5Qzt6rCiBUhJ2FIsGXo",
  authDomain: "crwn-clothing-db-5059b.firebaseapp.com",
  projectId: "crwn-clothing-db-5059b",
  storageBucket: "crwn-clothing-db-5059b.firebasestorage.app",
  messagingSenderId: "383290135136",
  appId: "1:383290135136:web:0538d26e8d51a887eda905",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Database
export const db = getFirestore();

// Create a user document from auth
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  // Check if user exists and access data
  const userSnapshot = await getDoc(userDocRef);

  // If user data does not exist
  // create/set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }

  // If user exists return userDocRef
  return userDocRef;
};
