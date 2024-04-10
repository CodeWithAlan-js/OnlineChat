import * as React from 'react';
import { Socket } from 'socket.io-client';

interface MessageDisplayProps {
    socket: Socket;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ socket }) => {
    const [messages, setMessages] = React.useState<string[]>([]);

    React.useEffect(() => {
        socket.on("new_message", ({ message }) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off("new_message");
        };
    }, [socket]);

    return (
        <div className="h-4/5 w-4/5 bg-primary text-white">
            {messages.map((message, index) => (
                <p key={index}>{message}</p>
            ))}
        </div>
    );
}

export default MessageDisplay;
