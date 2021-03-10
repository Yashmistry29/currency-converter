import React, { useContext, useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { auth } from "../firebase";

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
          Email:email
        }
        return localStorage.setItem(cred.user.uid,JSON.stringify(val))
  }

  function signin(email, password) {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(async (cred) => {
        await db
          .collection("users")
          .doc(cred.user.uid)
          .get()
          .then((doc) => {
            return <Redirect to="/dashboard" />;
          });
        /*.catch((err) => {
            console.error("ROLE ERROR", err);
          });*/
      })
      .catch((err) => {
        console.error("SIGNIN ERROR", err);
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
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
