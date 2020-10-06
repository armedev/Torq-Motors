import firebase from "firebase/app";
import CONFIG from "./firebase.config";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

//firebase initializing
firebase.initializeApp(CONFIG);
export default firebase;

//Google provider initializing
const Provider = new firebase.auth.GoogleAuthProvider();
Provider.setCustomParameters({ prompt: "select_account" });

//basic Exports
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

//creating user profile in firestore
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

//signInWithGoogle handler
export const signInWithGooglepopup = async (setIsLoading) => {
  setIsLoading(true);
  try {
    const signInGoogle = await auth.signInWithPopup(Provider);
    setIsLoading(false);
    console.log(signInGoogle);
    return signInGoogle;
  } catch (error) {
    await setIsLoading(false);
    alert(error.message);
    console.log(error.message);
  }
};

//converting data to map from firestore
export const convertSnapshotToMapCollections = (collections) => {
  const transformedCollections = collections.docs.map((doc) => {
    const id = doc.id;
    const { name, model, description, price } = doc.data();
    return {
      name,
      description,
      price,
      id,
      model,
    };
  });
  return transformedCollections;
};
