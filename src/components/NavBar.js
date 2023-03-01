import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const NavBar = () => {
  const [user] = useAuthState(auth)

  console.log(user)
  return (
    <nav className="nav-bar">
      <Link to="/" className="links">
        <h2>FireChat</h2>
      </Link>
      {user ? (
        <>
        <p style={{fontSize: "10px"}}>Developed by Juan Bianco</p>
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
