import * as React from "react";
import { Socket } from "socket.io-client";

interface MessageDisplayProps {
  socket: Socket;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ socket }) => {
  const [messages, setMessages] = React.useState<
    { user: string; message: string; timestamp: string }[]
  >([]);

  React.useEffect(() => {
    socket.on("new_message", ({ message, user }) => {
      const timestamp = new Date().toLocaleTimeString();
      setMessages((prev) => [...prev, { user, message, timestamp }]);
    });

    return () => {
      socket.off("new_message");
    };
  }, [socket]);

  return (
    <div className="h-full w-full text-secondary">
      {messages.map((message, index) => {
        return (
          <div
            key={index}
            className=" bg-gray-100 m-5 min-h-20 w-auto flex flex-col rounded"
          >
            <div className="flex justify-between ml-2 mr-2 mt-2">
              <p className="text-[#607b7d] font-Montserrat text-sm">
                {message.user}
              </p>
              <p className="flex justify-end place-items-end text-sm text-[#607b7d]">
                {message.timestamp}
              </p>
            </div>
            <div className="flex w-72 items-center ml-5 mt-2 mb-2 overflow-auto text-wrap">
              <p className="font-Montserrat">
                {message.message}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageDisplay;
