import React from "react";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const {
    handleChange,
    handleSubmitRegister,
    name,
    email,
    password,
    error,
    loading,
    sigInWithGoogle,
  } = useAuth();

  return (
    <section>
      <h3>Creá una cuenta</h3>
      <form className="form" onSubmit={handleSubmitRegister}>
        <div className="input_container">
          <label htmlFor="name">Nombre</label>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </div>
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
            {loading ? "Creando ..." : "Register"}
          </button>
        </div>
      </form>
      <div className="btn_container">
        <p>O creá tu cuenta con </p>
        <button className="btn " onClick={sigInWithGoogle}>
          <i class="bx bxl-google icons"></i>Google
        </button>
      </div>
    </section>
  );
};

export default Register;
