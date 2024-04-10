import { Socket, Server } from "socket.io";

const socketConfig = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("New connection");
    socket.on("join_room", ({ user, room }) => {
      socket.join(room);
      socket.to(room).emit("user_joined", user);
      console.log(`${user} joined room ${room}`);
    });
    socket.on("leave_room", ({ user, room }) => {
      socket.leave(room);
      socket.to(room).emit("user_left", user);
    });
    socket.on("send_message", ({ room, message }) => {
      socket.to(room).emit("receive_message", message);
    });
    socket.off("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export default socketConfig;
