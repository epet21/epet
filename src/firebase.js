import firebase from "firebase/app";
import 'firebase/database';
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBvZpAgo1gyEzDUNzQcCUxovTKuEQIBZwo",
    authDomain: "e-pet-project.firebaseapp.com",
    databaseURL: "https://e-pet-project-default-rtdb.firebaseio.com",
    projectId: "e-pet-project",
    storageBucket: "e-pet-project.appspot.com",
    messagingSenderId: "781367664673",
    appId: "1:781367664673:web:83d0e8659d6868a60b0360"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;