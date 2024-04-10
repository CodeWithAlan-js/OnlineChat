import * as React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Socket } from "socket.io-client";

interface SideBarProps {
  socket: Socket;
}

const SideBar: React.FC<SideBarProps> = ({ socket }) => {
  const [usersInRoom, setUsersInRoom] = React.useState<string[]>(() => {
    const storedUsers = localStorage.getItem("usersInRoom");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  React.useEffect(() => {
    socket.on("new_user", ({ users }) => {
      setUsersInRoom(users);
      localStorage.setItem("usersInRoom", JSON.stringify(users));
    });

    socket.on("users_in_room", ({ users }) => {
      setUsersInRoom(users);
      localStorage.setItem("usersInRoom", JSON.stringify(users));
    });

    return () => {
      socket.off("new_user");
      socket.off("users_in_room");
    };
  }, [socket]);

  return (
    <div className="h-full w-1/5 bg-primary flex flex-col justify-between items-center">
      <div className="h-1/3 mt-5">
        {usersInRoom.map((user) => (
          <Avatar key={user}>
            <AvatarFallback>{user[0]}</AvatarFallback>
          </Avatar>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
