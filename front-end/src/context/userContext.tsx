import React, { useContext, createContext, useState } from "react";

interface UserContextType {
  user: string;
  setUser: (value: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectRoom: (selectedRoom: Room) => void;
  room: string;
}

type Room = "" | "room1" | "room2" | "room3" | "room4" | "room5";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<string>("");
    const [room, setRoom] = useState<Room>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value);
    };

    const handleSelectRoom = (selectedRoom: Room) => {
      setRoom(selectedRoom);
    };


    return (
        <UserContext.Provider value={{ user, setUser, handleChange, handleSelectRoom, room }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
