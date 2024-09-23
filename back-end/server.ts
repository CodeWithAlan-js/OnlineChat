import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import socketConfig from "./socketConfig";

dotenv.config();

const app = express();
app.use(cors());

const server = http.createServer(app);

app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "";
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

socketConfig(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
