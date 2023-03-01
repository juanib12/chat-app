import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/User.context";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const [user] = useAuthState(auth);
  const { dataUser } = useAuth();
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
    <div className="profile">
      <div className="profile_detail">
        <img
          src={user.photoURL || dataUser.avatar}
          alt={`avatar-${user.displayName || dataUser.name}`}
        />
        <h2>{user.displayName || dataUser.name}</h2>
        <p>{user.email}</p>
        <button onClick={handleLogout} className="btn">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Profile;
