import { useRef } from "react";
import { io } from "socket.io-client";
export const useSocket = () => {
  const socket = useRef(
    new io("https://chat-with-gemini-app.onrender.com", {
      auth: {
        token: `${JSON.parse(localStorage.getItem("user"))}`,
      },
      autoConnect: false,
    })
  );
  console.log("bonjour");

  /*  */
  return socket.current;
};
