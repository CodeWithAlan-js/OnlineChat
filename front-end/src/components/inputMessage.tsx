import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { Socket } from "socket.io-client";
import { useUser } from "@/context/userContext";

interface InputMessageProps {
    socket: Socket;
}


const InputMessage: React.FC<InputMessageProps> = ({ socket }) => {
    const { room, user } = useUser();
    const [message, setMessage] = React.useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    const handleClick = () => {
        if (message.trim() !== "") {
            socket.emit("send_message", { message: message, room: room, user: user}); 
            setMessage("");
        }
    }


  return (
    <div className="w-full flex items-end h-20 border-t border-secondary">
      <div className="w-full flex justify-evenly items-center h-full ">
        <Input onChange={handleChange} className="w-3/5" placeholder="Type your message..." />
        <Button onClick={handleClick} className="bg-secondary" variant="default">Send</Button>
      </div>
    </div>
  );
};

export default InputMessage;
