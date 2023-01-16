import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyABn_5YWm-7nmdZ5Vm4ngi_wrF807LsH18",
    authDomain: "sistemas-d5b13.firebaseapp.com",
    projectId: "sistemas-d5b13",
    storageBucket: "sistemas-d5b13.appspot.com",
    messagingSenderId: "408033230951",
    appId: "1:408033230951:web:952e83a2ab61121ba994c2",
    measurementId: "G-YJEVXHD77Q"
  };
  
 if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
 }
  
 export default firebase;