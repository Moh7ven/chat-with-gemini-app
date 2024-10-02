import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonDisconnected from "../../components/ButtonDisconnected/ButtonDisconnected";
import s from "./chat.module.css";
import OldChatsComponent from "../../components/OldChatsComponent/OldChatsComponent";
import axios from "axios";
import { io } from "socket.io-client";

function Chat() {
  const navigate = useNavigate();
  const [chatTitle, setChatTitle] = useState("");
  const [messageApi, setMessageApi] = useState("");
  const [chats, setChats] = useState([]);

  const addNewChat = async () => {
    const newChat = await axios.post(
      "http://localhost:4000/api/chat",
      {
        name: chatTitle,
      },
      {
        headers: {
          Authorization: `${JSON.parse(localStorage.getItem("user"))}`,
        },
      }
    );
    if (newChat.data.status === true) {
      setMessageApi("Chat created successfully");
      setTimeout(() => {
        navigate("/message/" + newChat.data.chat.id);
      }, 2000);
    }
    /*  if (newChat.status === 403) {
      setMessageApi(newChat.response.data);
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } */
  };

  useEffect(() => {
    const socket = new io("http://localhost:4000", {
      auth: {
        token: `${JSON.parse(localStorage.getItem("user"))}`,
      },
    });

    socket.on("connect", () => {
      console.log("connected");
      socket.send("hello");
    });
    socket.on("message", (data) => {
      console.log(data);
    });
    socket.on("socket", (data) => {
      console.log(data);
    });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/signin");
    }
    axios
      .get("http://localhost:4000/api/chat/getAllChats", {
        headers: {
          Authorization: `${JSON.parse(localStorage.getItem("user"))}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setChats(res.data.chats);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <ButtonDisconnected />
      <h1>Create new chat</h1>
      <div className={s.addContainer}>
        <input
          type="text"
          placeholder="Add a new chat"
          className={s.inputAddChat}
          onChange={(e) => setChatTitle(e.target.value)}
        />
        <button className={s.buttonAddChat} onClick={() => addNewChat()}>
          +
        </button>
      </div>
      <p>{messageApi}</p>
      <div className={s.oldChats}>
        <h2>Old Chats</h2>
        <div>
          {chats &&
            chats.map((chat, index) => (
              <OldChatsComponent chat={chat} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Chat;
