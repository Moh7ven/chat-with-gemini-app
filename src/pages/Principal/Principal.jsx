import React, { useEffect, useState } from "react";
import ButtonDisconnected from "../../components/ButtonDisconnected/ButtonDisconnected";
import axios from "axios";
import { io } from "socket.io-client";

function Principal() {
  const [users, setUsers] = useState([]);

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
    /*  socket.on("salutation", (data) => {
      console.log(data);
    });
    socket.emit("helloServer", "Je suis connecté"); */
  }, []);

  return (
    <>
      <ButtonDisconnected />
      <div className="w-screen h-auto p-2 bg-purple-400 ">
        <p className="text-white text-2xl font-bold text-center">
          Chat with Me
        </p>
      </div>
      <div className="w-screen h-screen bg-white flex flex-row items-start justify-start">
        <div className="w-[17%] h-full ">
          <h1 className="w-full font-bold h-[25px] text-2xl text-center pb-2 bg-gray-200 ">
            Users
          </h1>
          <div className="w-full h-[70px] flex flex-row items-center justify-start p-1 bg-white  border-b-[1px] border-b-solid border-b-gray-300 relative">
            <div className="p-8 rounded-full bg-blue-300 bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbHxlbnwwfHwwfHx8MA%3D%3D')] bg-cover"></div>
            <div className="w-full h-full ml-2 p-1 flex flex-col items-start justify-start">
              <p className="text-xl font-bold">John Doe</p>
              <p className="text-md text-gray-500  text-ellipsis overflow-hidden">
                Salut, c'est toi ?
              </p>
            </div>
            <div className="absolute p-2 bg-lime-400 rounded-full top-[50px] left-[55px]"></div>
          </div>
        </div>
        <div className="w-[83%] h-full bg-red-300"></div>
      </div>
    </>
  );
}

export default Principal;
