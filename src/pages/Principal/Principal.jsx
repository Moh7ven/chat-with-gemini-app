import React, { useEffect, useState, useRef } from "react";
import ButtonDisconnected from "../../components/ButtonDisconnected/ButtonDisconnected";
import axios from "axios";

import { useSocket } from "../../lib/socket";

function Principal() {
  const [users, setUsers] = useState([]);
  const socket = useSocket();
  const [chats, setChats] = useState([]);
  const [connectUserId, setConnectUserId] = useState();
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");

  const messageRef = useRef();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, []);

  useEffect(() => {
    socket?.connect();
    socket?.on("connect", () => {
      socket?.emit("getUsers", (users) => {
        setUsers(users);
      });
    });

    socket?.on("sendMessage", ({ data, isNew }) => {
      console.log(data, isNew);

      if (isNew) {
        setChats([...chats, data]);
        console.log("receive", data);
      } else {
        console.log("receive", data);
        setChats(
          chats.map((chat) => {
            if (
              chat.userId === data.userId &&
              chat.contactId === data.contactId
            ) {
              return {
                ...chat,
                messages: [...chat.messages, data.messages],
              };
            } else {
              return chat;
            }
          })
        );
      }
    });
  }, [chats, socket]);

  const fetchChat = async () => {
    const res = await axios.get(`${process.env.IP_SERVER}/api/chat`, {
      headers: {
        Authorization: `${JSON.parse(localStorage.getItem("user"))}`,
      },
    });
    setChats(res.data.chats);
    setConnectUserId(res.data.userId);
    setUserName(res.data.userName);
  };

  useEffect(() => {
    fetchChat();
  }, []);

  // console.log("chats", chats);
  // console.log("connectUserId", connectUserId);
  // console.log("users", users);

  const getUserName = (chat) => {
    const isUser = chat.userId === connectUserId;

    if (isUser) {
      console.log("contact", chat.contact);
      return chat.contact;
    } else {
      console.log("user", chat.user);

      return chat.user;
    }
  };

  const getLastMessage = (chat) => {
    console.log("chat", chat);

    const last = chat?.messages[chat.messages?.length - 1];

    if (last) {
      return last;
    } else {
      return null;
    }
  };

  const sendMessage = () => {
    socket?.emit(
      "sendMessage",
      {
        chatId: currentChat.id,
        message: message,
        contactId: currentChat.contactId,
      },
      (data) => {
        if (currentChat.id) {
          setChats(
            chats.map((chat) => {
              if (chat.id === currentChat.id) {
                return {
                  ...chat,
                  messages: [...chat.messages, data.messages],
                };
              } else {
                return chat;
              }
            })
          );
          setMessage("");
        } else {
          setChats([...chats, data]);
        }
      }
    );
  };

  /* useEffect(() => {
    if (users.length > 0) {
      const contact = users[0];
      socket?.emit(
        "initChat",
        {
          contactId: contact.id,
          text: "hello",
        },
        (data) => {
          console.log("data", data);
        }
      );
    }
  }, [users, socket]); */

  console.log("userName", userName);

  return (
    <>
      <ButtonDisconnected />
      <div className="w-screen h-auto p-2 bg-purple-400 ">
        <p className="text-white text-2xl font-bold text-center">
          Chat with Me
        </p>
        <p className="text-black text-2xl font-bold text-right mt-2">
          {userName}
        </p>
      </div>
      <div className="w-screen h-[95vh] bg-white flex flex-row items-start justify-start">
        <div className="w-[17%] h-full ">
          <h1 className="w-full font-bold h-[25px] text-2xl text-center pb-2 bg-gray-200 ">
            Users
          </h1>

          {chats.map((chat, key) => {
            return (
              <div
                key={key}
                className="w-full h-[70px] flex flex-row items-center justify-start p-1 bg-white  border-b-[1px] border-b-solid border-b-gray-300 relative "
                onClick={() => {
                  setCurrentChat({
                    contactId: getUserName(chat).id,
                    id: chat.id,
                  });
                }}
              >
                <div className="p-8 rounded-full bg-blue-300 bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbHxlbnwwfHwwfHx8MA%3D%3D')] bg-cover"></div>
                <div className="w-full h-full ml-2 p-1 flex flex-col items-start justify-start">
                  <p className="text-xl font-bold">{getUserName(chat)?.name}</p>
                  <p className="text-md text-gray-500  text-ellipsis overflow-hidden">
                    {getLastMessage(chat)?.text}
                  </p>
                </div>
                <div
                  className={`absolute p-2 ${
                    users.find((user) => user.id === getUserName(chat)?.id)
                      ? "bg-lime-400"
                      : "bg-red-400"
                  }rounded-full top-[50px] left-[55px]`}
                ></div>
              </div>
            );
          })}
          {users
            .filter((user) => {
              const isChat =
                chats.length > 0
                  ? chats.find((chat) => {
                      const isUser =
                        chat.userId === connectUserId
                          ? chat.contactId !== user.id
                          : chat.userId !== user.id;
                      return isUser;
                    })
                  : true;
              console.log("isChat", isChat);

              return isChat;
            })
            .map((user, key) => {
              return (
                <div
                  key={key}
                  className="w-full h-[70px] flex flex-row items-center justify-start p-1 bg-white  border-b-[1px] border-b-solid border-b-gray-300 relative"
                  onClick={() =>
                    setCurrentChat({ contactId: user.id, messages: [] })
                  }
                >
                  <div className="p-8 rounded-full bg-blue-300 bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbHxlbnwwfHwwfHx8MA%3D%3D')] bg-cover"></div>
                  <div className="w-full h-full ml-2 p-1 flex flex-col items-start justify-start">
                    <p className="text-xl font-bold">{user.name}</p>
                    <p className="text-md text-gray-500  text-ellipsis overflow-hidden"></p>
                  </div>
                  <div className="absolute p-2 bg-lime-400 rounded-full top-[50px] left-[55px]"></div>
                </div>
              );
            })}
        </div>
        <div
          className="w-[83%] h-[100%] flex flex-col items-start justify-start"
          ref={messageRef}
        >
          {currentChat && (
            <>
              <div className="w-full h-[95%] bg-gray-100 flex flex-col items-start justify-start overflow-x-hidden">
                {chats
                  .find((param) => param.id === currentChat.id)
                  ?.messages.map((message, key) => {
                    return (
                      <div
                        className={`w-[45%] rounded-md ${
                          message.senderId === connectUserId
                            ? "bg-white self-end text-black"
                            : "bg-blue-400 self-start text-white"
                        } m-2 my-10`}
                        key={key}
                      >
                        <p className="text-md  p-4">{message.text}</p>
                        <span className="w-[100%] inline-block text-right text-white font-bold ">
                          {" "}
                          {new Date(message.date).getUTCHours() +
                            ":" +
                            new Date(message.date).getMinutes()}
                        </span>
                      </div>
                    );
                  })}
              </div>
              <div className="w-full h-[5%] flex flex-row items-start justify-start">
                <input
                  type="text"
                  className="w-[90%] h-full p-2 border-t-solid border-t-gray-300 border-t-[1px] mr-5 outline-none placeholder:italic"
                  placeholder="Enter your message here"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                <button
                  className="w-[10%] h-full bg-green-500 text-white p-2 font-bold align-center"
                  onClick={sendMessage}
                >
                  Send
                </button>
              </div>
            </>
          )}
          {!currentChat && (
            <div className="w-full h-[95%] bg-gray-100 flex flex-col items-center justify-center">
              <p className="text-5xl font-bold">Please, Select a chat</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Principal;
