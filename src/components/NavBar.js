import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/User.context";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const NavBar = () => {
  const [user] = useAuthState(auth);
  const { logoutUser } = useUserContext();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <nav className="nav-bar">
      <Link to="/" className="links">
        <h2>Chat-APP</h2>
      </Link>
      {
        user ? (
          <>
            <p>{user?.displayName}</p>
            <button onClick={handleLogout} className="btn">
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
          <Link to="/register">Registrarse</Link>
          <Link to="/login">Iniciar sesión</Link>
          </>
        )
        // <button className="btn">Login</button>
      }
    </nav>
  );
};

export default NavBar;
