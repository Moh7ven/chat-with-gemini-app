import React from "react";
import s from "./OldChatsComponent.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OldChatsComponent({ chat }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/message/" + chat.id);
  };

  const deleteChat = async () => {
    const chatId = chat.id;
    const del = await axios.delete(`http://localhost:4000/api/chat/${chatId}`, {
      headers: {
        Authorization: `${JSON.parse(localStorage.getItem("user"))}`,
      },
    });
    if (del.data.status === true) {
      window.location.reload();
    } else {
      console.log(del.data.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <div
        className={s.container}
        onClick={() => {
          handleClick();
        }}
      >
        <p>{chat.name}</p>
      </div>
      <button onClick={() => deleteChat()} className={s.delete}>
        Delete
      </button>
    </div>
  );
}

export default OldChatsComponent;
