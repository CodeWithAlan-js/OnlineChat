import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { Socket } from "socket.io-client";
import { useUser } from "@/context/userContext";

interface InputMessageProps {
    socket: Socket;
}


const InputMessage: React.FC<InputMessageProps> = ({ socket }) => {
    const { room } = useUser();
    const [message, setMessage] = React.useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    const handleClick = () => {
        if (message.trim() !== "") {
            socket.emit("send_message", { message: message, room: room }); 
            setMessage("");
        }
    }


  return (
    <div className="w-full h-full flex justify-center items-end">
      <div className="w-full flex justify-evenly items-center h-24 border-t border-secondary">
        <Input onChange={handleChange} className="w-3/5" placeholder="Type your message..." />
        <Button onClick={handleClick} className="bg-secondary" variant="default">Send</Button>
      </div>
    </div>
  );
};

export default InputMessage;
