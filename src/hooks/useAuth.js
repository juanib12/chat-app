import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase";
import {
  updateDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
  addDoc,
  Timestamp,
  setDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

export const useAuth = () => {
  const [user] = useAuthState(auth)
  const googleProvider = new GoogleAuthProvider();
  const [dataUser, setDataUser] = useState([]);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const history = useNavigate();

  const { name, email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: "Todos los campos son requeridos!" });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });
      setData({
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      history("/", { replace: true });
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };

  const sigInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
          createdAt: Timestamp.fromDate(new Date()),
          isOnline: true,
          avatar: user.photoURL,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!name || !email || !password) {
      setData({ ...data, error: "Todos los campos son requeridos!" });
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
        authProvider: "Email and Password",
      });
      setData({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      history("/", { replace: true });
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };

  
  const getDataUser = async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setDataUser(doc.data());
    });
  };

  useEffect(() => {
    getDataUser();
  }, []);

  return {
    handleChange,
    handleSubmitLogin,
    sigInWithGoogle,
    signInWithEmailAndPassword,
    name,
    email,
    password,
    error,
    loading,
    setData,
    handleSubmitRegister,
    createUserWithEmailAndPassword,
    dataUser
  };
};
