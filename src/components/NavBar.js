import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const NavBar = () => {
  const [user] = useAuthState(auth)

  return (
    <nav className="nav-bar">
      <Link to="/" className="links">
        <h2>Chat-APP</h2>
      </Link>
      {user ? (
        <>
          <Link to="/profile">
            <img src={user.photoURL} alt={`avatar-${user.displayName}`} className="avatar-navbar"/>
          </Link>
        </>
      ) : (
        <>
          <Link to="/register">Registrarse</Link>
          <Link to="/login">Iniciar sesión</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
