import * as React from 'react';
import { Socket } from 'socket.io-client';
import { IoMdExit } from "react-icons/io";
import { useNavigate } from 'react-router';
import { useUser } from '@/context/userContext';

interface LeaveButtonProps {
    socket: Socket;
}

const LeaveButton: React.FC<LeaveButtonProps> = ({ socket }) => {
    const navigate = useNavigate();
    const { user, room, setUser, setRoom } = useUser();

    const handleClick = () => {
        socket.emit("leave_room", { user, room });
        navigate("/");
        setUser("");
        setRoom("");
    }

    console.log(user, room);

    return (
        <button onClick={handleClick} className="absolute border-t  bottom-0 w-full h-[73px] bg-transparent flex justify-center items-center">
            <IoMdExit className="text-white text-3xl" />
        </button>
    );
}

export default LeaveButton;
