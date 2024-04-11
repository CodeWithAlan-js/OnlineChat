import { Socket, Server } from "socket.io";
import { MessageModel } from "./models/messageModels";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

mongoose.connect(MONGO_URI);

const saveMessageToDB = async (content: string, user: string, room: string) => {
    try {
        const message = new MessageModel({ content, user, room });
        await message.save();
        console.log('Message saved to database:', message);
    } catch (error) {
        console.error('Error saving message to database:', error);
    }
};


let chatRooms: { [key: string]: string[] } = {};
const getCurrentTimestamp = () => {
  return new Date().toISOString();
};

const handleJoinRoom = (
  io: Server,
  socket: Socket,
  room: string,
  user: string
) => {
  socket.join(room);
  if (!chatRooms[room]) {
    chatRooms[room] = [];
  }
  chatRooms[room].push(user);

  const timestamp = getCurrentTimestamp();

  io.to(room).emit("new_user", { user, room, users: chatRooms[room] });
  io.to(room).emit("new_message", {
    message: `Welcome ${user} ❤️`,
    user: "ChatBot",
    timestamp,
  });
};

const handleSendMessage = async (
    io: Server,
    socket: Socket,
    message: string,
    room: string,
    user: string,
) => {
    const timestamp = getCurrentTimestamp();
    await saveMessageToDB(message, user, room);
    io.to(room).emit("new_message", { message, user, timestamp });
};

const handleLeaveRoom = (
  io: Server,
  socket: Socket,
  room: string,
  user: string
) => {
  const timestamp = getCurrentTimestamp();
  const index = chatRooms[room]?.indexOf(user);
  if (index !== -1) {
    chatRooms[room]?.splice(index, 1);
    io.to(room).emit("user_left", { users: chatRooms[room] });
  }
  io.to(room).emit("new_message", {
    message: `${user} has left the room`,
    user: "ChatBot",
    timestamp,
  });
};

const socketConfig = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on("join_room", ({ user, room }) => {
      handleJoinRoom(io, socket, room, user);
    });

    socket.on("send_message", ({ message, room, user, timestamp }) => {
      handleSendMessage(io, socket, message, room, user);
    });

    socket.on("leave_room", ({ user, room }) => {
      handleLeaveRoom(io, socket, room, user);
    });
  });
};

export default socketConfig;
