import React, { useState } from "react";
import "./Saisir.css";
import Message from "../Message/Message";
import axios from "axios";

function Saisir() {
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");

  const sendRequest = async (message) => {
    const req = await axios.post("http://localhost:4000/api/send-message", {
      message: message,
    });

    console.log(req);
    setMessage((old) => [...old, { message: req.data, user: "gemini" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage([...message, { message: input, user: "me" }]);
    setInput("");
    sendRequest(input);
    console.log(message);
    console.log(input);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "30px",
      }}
    >
      <div className="message-container">
        {message.map((element, index) => (
          <Message message={element.message} user={element.user} key={index} />
        ))}
      </div>
      <div className="saisir-container">
        <input
          type="text"
          placeholder="Enter your question"
          className="saisir"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn-saisir" onClick={(e) => handleSubmit(e)}>
          <img src="/envoyer.png" alt="" height={25} width={25} />
        </button>
      </div>
    </div>
  );
}

export default Saisir;
