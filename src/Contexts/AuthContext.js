import React, { useContext, useState, useEffect } from "react";
import { auth } from "../Firebase";
import firebase from "firebase/app";
import "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  const [loading, setloading] = useState(true);

  function signup(email, password, name, mobile) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        const val = {
          Name:name,
          Mobile:mobile,
          Email:email,
        }
        const user=cred.user.uid;
        return (localStorage.setItem(user,JSON.stringify(val)));
        })
        .catch(function (err) {
          console.log("SIGNUP ERROR", err);
        });
  }
  function signin(email, password) {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((cred)=>{
        const data=localStorage.getItem(cred.user.uid);
        return(JSON.parse(data));
      })
      .catch(function (err) {
        console.log("SIGNIN ERROR", err);
      });
  }

  function SigninWithGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
    .then((result)=>{
      var user = result.user;
      const val={
        Name:user.displayName,
        Email:user.email
      }
      return (localStorage.setItem(user.uid,JSON.stringify(val)));
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      console.log(errorCode,errorMessage,email,credential)
    });
  }
  function logout() {
    return auth.signOut();
  }
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setloading(false);
    });
    return unsub;
  }, []);

  const value = {
    currentUser,
    signup,
    signin,
    SigninWithGoogle,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
