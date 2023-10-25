import firebase from 'firebase';

export const firebaseConfig = {
  apiKey: "AIzaSyCJ14_u7XmvsKKjRM059kiPa0ZHdn9L7u4",
  authDomain: "digilib-f0c97.firebaseapp.com",
  projectId: "digilib-f0c97",
  storageBucket: "digilib-f0c97.appspot.com",
  messagingSenderId: "633140166428",
  appId: "1:633140166428:web:1e91cde16aa0e1766d44d9"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
export default firebase.firestore();
