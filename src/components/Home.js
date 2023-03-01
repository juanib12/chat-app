import React from "react";
import {auth} from "../firebase";
import User from "../components/User";
import MessageForm from "../components/MessageForm";
import Message from "../components/Message";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Img from "../images/userSinFoto.png";
import { useHooks } from "../hooks/useHooks";

const Home = () => {
  const {
    users,
    selectUser,
    msgs,
    chat,
    handleSubmit,
    error,
    text,
    setText,
    setImg,
  } = useHooks();
  const [user] = useAuthState(auth);
  const user1 = auth?.currentUser?.uid;

console.log(user1)
  return (
    <>
      {user ? (
        <div className="home_container">
          <div className="users_container">
            {users.map((user) => (
              <User
                key={user.uid}
                user={user}
                selectUser={selectUser}
                user1={user1}
                chat={chat}
              />
            ))}
          </div>
          <div className="messages_container">
            {chat ? (
              <>
                <div className="messages_user">
                  <img src={chat.avatar || Img} className="avatar" />
                  <div className="messages_user-detail">
                    <h3>{chat.name}</h3>
                    <p>{chat.email}</p>
                  </div>
                </div>
                <div className="messages">
                  {msgs.length
                    ? msgs.map((msg, i) => (
                        <Message key={i} msg={msg} user1={user1} />
                      ))
                    : null}
                </div>
                <MessageForm
                  handleSubmit={handleSubmit}
                  text={text}
                  setText={setText}
                  setImg={setImg}
                  error={error}
                />
              </>
            ) : (
              <h3 className="no_conv">
                Seleccioná a un usuario para comenzar una conversación
              </h3>
            )}
          </div>
        </div>
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
};

export default Home;
