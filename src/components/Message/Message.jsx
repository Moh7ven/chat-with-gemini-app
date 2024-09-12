import React from "react";
import "./message.css";

function Message({ message, user }) {
  return (
    <div
      className="message"
      style={{
        alignSelf: user === "me" ? "flex-end" : "flex-start",
        backgroundColor: user === "me" ? "#6f6464" : "#5271ff",
      }}
    >
      <p>{message}</p>
    </div>
  );
}

export default Message;
