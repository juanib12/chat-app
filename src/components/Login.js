import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
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
} from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const [user] = useAuthState(auth);
  const googleProvider = new GoogleAuthProvider();

  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const history = useNavigate();

  const { email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
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
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      {!user ? (
        <>
          <h3>Inicia sesión</h3>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input_container">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="input_container">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            {error ? <p className="error">{error}</p> : null}
            <div className="btn_container">
              <button className="btn" disabled={loading}>
                {loading ? "Iniciando sesión ..." : "Iniciar Sesión"}
              </button>
            </div>
          </form>
          <div className="btn_container">
            <button className="btn" onClick={sigInWithGoogle}>
              Inicia sesión con Google
            </button>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </section>
  );
};

export default Login;
