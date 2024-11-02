import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  useEffect(() => {
    const check = localStorage.getItem("user");
    if (check) {
      navigate("/chat");
    }
  }, []);

  const [donnee, setDonnee] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [message, setMessge] = useState("");
  const navigate = useNavigate();

  const signUp = async () => {
    console.log(donnee);

    const request = await axios.post(
      "https://chat-with-gemini-app.onrender.com/api/auth/signUp",
      donnee
    );
    console.log(request.data);
    if (request.data.status === true) {
      setMessge("Account created successfully");
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } else {
      setMessge(request.data.message);
      setTimeout(() => {
        setMessge("");
      }, 3000);
    }

    // navigate("/signin");
  };

  return (
    <div className="connect-container">
      <h1>Sign Up</h1>

      <form className="form-connect">
        <input
          type="text"
          placeholder="name"
          className="input-connect"
          id="name"
          onChange={(e) => setDonnee({ ...donnee, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="email"
          className="input-connect"
          id="email"
          onChange={(e) => setDonnee({ ...donnee, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="phone number"
          className="input-connect"
          id="phoneNumber"
          onChange={(e) =>
            setDonnee({ ...donnee, phoneNumber: e.target.value })
          }
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
            signUp();
          }}
        >
          Se connecter
        </button>

        <p className="text-connect">{message}</p>
      </form>
      <p className={{ cursor: "pointer" }} onClick={() => navigate("/signin")}>
        You have an account ? Sign In
      </p>
    </div>
  );
}
