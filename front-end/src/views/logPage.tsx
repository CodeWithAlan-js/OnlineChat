import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CiHeart } from "react-icons/ci";
import InputName from "@/components/inputName";
import { useUser } from "@/context/userContext";
import { useNavigate } from "react-router";
import RoomSelection from "@/components/roomSelection";
import { Socket } from "socket.io-client";


interface LogPageProps {
  socket: Socket;
}

const LogPage: React.FC<LogPageProps> = ({ socket }) => {
  const { user, room } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");  

  const handleClick = () => {
    if (user === "" && room === "") {
      setError("Please enter your name and select a room");
    } else if (user === "") {
      setError("Please enter your name");
    } else if (room === "") {
      setError("Please select a room");
    } else {
      setError("");
    }
    socket.emit("join_room", { user, room });
      navigate("/chat");
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="h-2/5 flex flex-col justify-around items-center">
        <div>
          <p className="text-5xl mr-8 font-bold text-primary font-Montserrat">
            LoveLoop
          </p>
          <div className="flex items-center w-full justify-center gap-1 ml-8">
            <p className="font-Indie text-xl">Online chat for finding love</p>
            <CiHeart className="text-2xl text-primary" />
          </div>
        </div>
        {error && <p className="text-red-500  w-full">{error}</p>}
        <div className="flex flex-col items-center gap-5">
          <InputName />
          <RoomSelection />
          <Button variant="default" onClick={handleClick}>
            Start Chatting
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogPage;
