import React, { useEffect, useState, useRef } from "react";
import ButtonDisconnected from "../../components/ButtonDisconnected/ButtonDisconnected";
import axios from "axios";

import { useSocket } from "../../lib/socket";

function Principal() {
  const [users, setUsers] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    socket?.connect();
    socket?.on("connect", () => {
      socket?.emit("getUsers", (users) => {
        setUsers(users);
      });
    });
  }, []);

  return (
    <>
      <ButtonDisconnected />
      <div className="w-screen h-auto p-2 bg-purple-400 ">
        <p className="text-white text-2xl font-bold text-center">
          Chat with Me
        </p>
      </div>
      <div className="w-screen h-[95vh] bg-white flex flex-row items-start justify-start">
        <div className="w-[17%] h-full ">
          <h1 className="w-full font-bold h-[25px] text-2xl text-center pb-2 bg-gray-200 ">
            Users
          </h1>

          {users.map((user, key) => {
            return (
              <div
                key={key}
                className="w-full h-[70px] flex flex-row items-center justify-start p-1 bg-white  border-b-[1px] border-b-solid border-b-gray-300 relative"
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
        <div className="w-[83%] h-[100%] flex flex-col items-start justify-start">
          <div className="w-full h-[95%] bg-gray-100 flex flex-col items-start justify-start overflow-x-hidden">
            <div className="w-[45%] rounded-md  bg-blue-400 m-2 my-10">
              <p className="text-white text-md  p-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                omnis iusto alias facilis magnam quisquam nemo ab sint ipsam
                veniam eveniet rerum fugit unde officiis natus, distinctio
                aliquam expedita sequi.
              </p>
              <span className="w-[100%] inline-block text-right text-white font-bold ">
                {" "}
                12:00
              </span>
            </div>
            <div className="w-[45%] rounded-md  bg-white text-black self-end m-2 my-10">
              <p className=" text-md  p-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                omnis iusto alias facilis magnam quisquam nemo ab sint ipsam
                veniam eveniet rerum fugit unde officiis natus, distinctio
                aliquam expedita sequi.
              </p>
              <span className="w-[100%] inline-block text-right text-white font-bold ">
                {" "}
                12:00
              </span>
            </div>
          </div>
          <div className="w-full h-[5%] flex flex-row items-start justify-start">
            <input
              type="text"
              className="w-[90%] h-full p-2 border-t-solid border-t-gray-300 border-t-[1px] mr-5 outline-none placeholder:italic"
              placeholder="Enter your message here"
            />
            <button className="w-[10%] h-full bg-green-500 text-white p-2 font-bold align-center">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Principal;
