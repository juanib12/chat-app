import React from "react";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const {
    handleChange,
    handleSubmitLogin,
    sigInWithGoogle,
    signInWithEmailAndPassword,
    name,
    email,
    password,
    error,
    loading,
  } = useAuth();
  const [user] = useAuthState(auth);

  return (
    <section>
      {!user ? (
        <>
          <h3>Inicia sesión</h3>
          <form className="form" onSubmit={handleSubmitLogin}>
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
            <p>O inicia sesión con </p>
            <button className="btn" onClick={sigInWithGoogle}>
              <i class='bx bxl-google icons'></i>Google
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
