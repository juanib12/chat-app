import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import NavBar from "./components/NavBar";
import { UserContextProvider } from "./context/User.context";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route element={<Home />} path="/" exact />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
