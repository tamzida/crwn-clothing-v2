import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
   } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAtsPVcQTCfLlRg3jwUfZTgZyb6VENnbEU",
    authDomain: "crwn-clothing-db-a64d3.firebaseapp.com",
    projectId: "crwn-clothing-db-a64d3",
    storageBucket: "crwn-clothing-db-a64d3.appspot.com",
    messagingSenderId: "918211731047",
    appId: "1:918211731047:web:d61f4f48b56b50ce74bec2"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider. setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapShot = await getDoc(userDocRef);

    if(!userSnapShot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error){
          console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
  }