import React from "react";
import s from "./OldChatsComponent.module.css";
import { useNavigate } from "react-router-dom";

function OldChatsComponent({ chat }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/message/" + chat.id);
  };

  return (
    <div
      className={s.container}
      onClick={() => {
        handleClick();
      }}
    >
      <p>{chat.name}</p>
      <p>01/01/2024</p>
    </div>
  );
}

export default OldChatsComponent;
