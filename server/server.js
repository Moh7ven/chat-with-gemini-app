import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";

import dotenv from "dotenv";
// import prisma from "./lib/prisma-client.js";
import authRouter from "./routers/auth.router.js";
import chatRouter from "./routers/chat.router.js";
import { checkUser } from "./middlewares/checkUser.js";

import { verifyToken } from "./lib/jwt.js";
import { addMessage, initiateChat } from "./controllers/chat.controller.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/chat", checkUser, chatRouter);

/* creation of server */
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  },
});

/* niddleware for socket */
io.use(async (socket, next) => {
  const handShakes = socket.handshake.auth.token;
  const verif = await verifyToken(handShakes);
  console.log(verif);

  if (verif) {
    socket.session = {
      id: verif.id,
      name: verif.name,
    };
    next();
  } else {
    const err = new Error("unauthorized");
    // console.error(err.message);
    socket.send(err.message);
  }
});

const getSocketId = (id) => {
  return new Promise((next) => {
    io.sockets.sockets.forEach((socket) => {
      console.log("socket:", socket.session);
      console.log("id:", id);

      if (socket.session.id === id) {
        next(socket.id);
      }
    });
    next(null);
  });
};
const getUsers = (id) => {
  const outPut = [];
  return new Promise((next) => {
    io.sockets.sockets.forEach((socket) => {
      if (socket.session.id !== id) {
        outPut.push({
          id: socket.session.id,
          socketId: socket.id,
          name: socket.session.name,
        });
      }
    });
    next(outPut);
  });
};

/* connexion of socket */
io.on("connection", async (socket) => {
  const socketId = await getSocketId(1);
  console.log("a user connected", socketId);
  socket.on("getUsers", async (cb) => {
    const users = await getUsers(socket.session.id);
    // console.log("users:", users);
    cb(users);
  });

  socket.on("sendMessage", async (data, cb) => {
    let message;
    if (data.chatId) {
      message = await addMessage({
        ...data,
        senderId: socket.session.id,
      });
    } else {
      message = await initiateChat({ ...data, userId: socket.session.id });
    }
    console.log(message);
    if (message.status) {
      const sendData = data.chatId
        ? {
            messages: message.message,
            userId: message.userId,
            contactId: message.contactId,
          }
        : { ...message.chat, messages: [message.message] };
      const contactSocketId = await getSocketId(data.contactId);
      console.log("contactSocketId:", contactSocketId);
      if (contactSocketId) {
        socket.to(contactSocketId).emit("sendMessage", {
          data: sendData,
          isNew: data.chatId ? false : true,
        });
      }
      cb(sendData);

      console.log("data:", data);
    }
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  /* if (socketId) {
    socket.to(socketId).emit("socket", "For your socket id");
  } */

  /*  socket.emit("salutation", "hello for emit");
  socket.on("helloServer", (data) => {
    console.log(data);
  }); */

  /* socket.on("disconnect", () => {
    console.log("user disconnected");
  }); */
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
