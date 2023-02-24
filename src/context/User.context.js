import { createContext, useEffect, useState, useContext } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { setPersistence, inMemoryPersistence } from "firebase/auth";

export const UserContext = createContext({});

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const registerUser = (email, name, password) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password).then(() =>
      updateProfile(auth.currentUser, {
        displayName: name,
      })
        .then((res) => null)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    );
  };

  const signInUser = (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => null)
      .catch((err) => setError(err.code))
      .finally(() => setLoading(false));
  };

  const logoutUser = () => {
    signOut(auth);
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const contextValue = {
    user,
    loading,
    error,
    signInUser,
    registerUser,
    logoutUser,
    forgotPassword,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
