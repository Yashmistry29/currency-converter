import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBGFI0u3jCluZXknXQIxq91zA2pc9AbeR4",
    authDomain: "currencyconverter-7181e.firebaseapp.com",
    projectId: "currencyconverter-7181e",
    storageBucket: "currencyconverter-7181e.appspot.com",
    messagingSenderId: "795399705570",
    appId: "1:795399705570:web:aa2b33e196de2691089fbb"
});

export const auth = app.auth();
export default app;