import React from "react";
import "./message.css";

function Message({ message, isAI, date }) {
  return (
    <div
      className="message"
      style={{
        alignSelf: isAI === false ? "flex-end" : "flex-start",
        backgroundColor: isAI === false ? "#6f6464" : "#5271ff",
        textAlign: isAI === "me" ? "right" : "left",
      }}
    >
      <p>{message}</p>
      {/* <div
        style={{
          position: "absolute",
          marginTop: "10px",
        }}
      >
        <p style={{ color: "black", opacity: "0.2" }}>
          {date.split("T")[0]} {date.split("T")[1].split(".")[0]}
        </p>
      </div> */}
    </div>
  );
}

export default Message;
