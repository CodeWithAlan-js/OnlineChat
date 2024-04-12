import * as React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Socket } from "socket.io-client";
import LeaveButton from "./leaveButton";

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

    socket.on("user_left", ({ users }) => {
      setUsersInRoom(users);
      localStorage.setItem("usersInRoom", JSON.stringify(users));
    });

    return () => {
      socket.off("new_user");
      socket.off("users_in_room");
    };
  }, [socket]);

  console.log(usersInRoom);

  return (
    <div className="h-full w-1/5 md:w-1/6 bg-primary relative">
      <div className="mt-5 flex flex-col justify-between items-center min-h-32 ">
        {usersInRoom.map((user) => (
          <Avatar key={user}>
            <AvatarFallback>{user[0]}</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <LeaveButton socket={socket} />
    </div>
  );
};

export default SideBar;
