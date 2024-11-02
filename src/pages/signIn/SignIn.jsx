import React, { useEffect, useState } from "react";
import "./signIn.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignIn() {
  /* const [email, setEmail] = useState();
  const [password, setPassword] = useState(); */

  const [donnee, setDonnee] = useState({ email: "", password: "" });
  const [message, setMessge] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const check = localStorage.getItem("user");
    if (check) {
      navigate("/chat");
    }
  }, []);

  const signIn = async () => {
    console.log(donnee);
    const request = await axios.post(
      "https://chat-with-gemini-app.onrender.com/api/auth/signIn",
      donnee
    );
    if (request.data.status === true) {
      localStorage.setItem("user", JSON.stringify(request.data.data));
      setMessge("Welcome");
      setTimeout(() => {
        navigate("/chat");
      }, 2000);
    } else {
      console.log(request.data.data);
      setMessge(request.data.data);
      setTimeout(() => {
        setMessge("");
      }, 2000);
    }
    //   navigate("/quizz");
  };

  return (
    <div className="connect-container">
      <h1>Sign In</h1>
      <p></p>
      <form className="form-connect">
        <input
          type="email"
          placeholder="email"
          className="input-connect"
          id="email"
          onChange={(e) => setDonnee({ ...donnee, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="password"
          className="input-connect"
          id="password"
          onChange={(e) => setDonnee({ ...donnee, password: e.target.value })}
        />
        {/* <p className="text-connect forgot">Mot de passe oublie ?</p> */}
        <button
          className="btn-connect"
          id="connexion"
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          Se connecter
        </button>
        <p className="text-connect">{message}</p>
      </form>
      <p onClick={() => navigate("/")}>You don't have an account ? Sign Up</p>
    </div>
  );
}
