import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBkZqDowDIZadSe1iSVPdLG9l2XQeJt1C8",
  authDomain: "hero-motors-1e195.firebaseapp.com",
  databaseURL: "https://hero-motors-1e195.firebaseio.com",
  projectId: "hero-motors-1e195",
  storageBucket: "hero-motors-1e195.appspot.com",
  messagingSenderId: "755601969325",
  appId: "1:755601969325:web:076721e22653a85322f624",
  measurementId: "G-2D4613M2X2",
};

export const createUserProfileDoc = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

const Provider = new firebase.auth.GoogleAuthProvider();
Provider.setCustomParameters({ prompt: "select_account" });

firebase.initializeApp(config);
export default firebase;

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const signInWithGooglepopup = async (setIsLoading) => {
  setIsLoading(true);
  const signInGoogle = await auth.signInWithPopup(Provider);
  setIsLoading(false);
  return signInGoogle;
};
