import { Socket, Server } from "socket.io";

let chatRooms: { [key: string]: string[] } = {};

const handleJoinRoom = (io: Server, socket: Socket, room: string, user: string) => {
    socket.join(room);
    if (!chatRooms[room]) {
        chatRooms[room] = [];
    }
    chatRooms[room].push(user);
    io.to(room).emit("new_user", { user, room, users: chatRooms[room] });
};

const handleSendMessage = (io: Server, socket: Socket, message: string, room: string) => {
    io.to(room).emit("new_message", {message});
    console.log(room, message);
};

const handleDisconnect = (io: Server, socket: Socket) => {
    console.log("User disconnected");
    for (const room in chatRooms) {
        const index = chatRooms[room].indexOf(socket.id);
        if (index !== -1) {
            chatRooms[room].splice(index, 1);
            io.to(room).emit("user_left", { user: socket.id, room, users: chatRooms[room] });
        }
    }
};

const socketConfig = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log("User connected");

        socket.on("join_room", ({ user, room }) => {
            handleJoinRoom(io, socket, room, user);
        });

        socket.on("send_message", ({ message, room }) => {
            handleSendMessage(io, socket, message, room);
        });

        socket.on("disconnect", () => {
            handleDisconnect(io, socket);
        });
    });
};

export default socketConfig;
