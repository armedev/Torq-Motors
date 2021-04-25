import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import CONFIG from './firebase.config';

//firebase initializing
firebase.initializeApp(CONFIG);
export default firebase;

//Google provider initializing
const Provider = new firebase.auth.GoogleAuthProvider();
Provider.setCustomParameters({ prompt: 'select_account' });

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
    const photoURL = userAuth.photoURL ? userAuth.photoURL : '';
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
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
    // console.log(signInGoogle);
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
    const data = doc.data();
    // const {
    //   name,
    //   model,
    //   desc,
    //   price,
    //   attributes,
    //   fuelType,
    //   brand,
    //   owners,
    //   kmRan,
    //   insurance,
    // } = doc.data();
    return {
      // name,
      // desc,
      // price,
      ...data,
      id,
      // model,
      // attributes,
      // fuelType,
      // brand,
      // owners,
      // kmRan,
      // insurance,
    };
  });
  return transformedCollections;
};
