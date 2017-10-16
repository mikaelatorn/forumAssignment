import firebase from "firebase/app";
require("firebase/auth");
require("firebase/database");

var config = {
    apiKey: "AIzaSyBAFF0ZJuHbsoetOvcfQvjVk52pfM_mDAo",
    authDomain: "react-9c6d5.firebaseapp.com",
    databaseURL: "https://react-9c6d5.firebaseio.com",
    projectId: "react-9c6d5",
    storageBucket: "react-9c6d5.appspot.com",
    messagingSenderId: "577422281659"
};
firebase.initializeApp(config);
// var database = firebase.database();

export default firebase;