import * as React from 'react';
import { Socket } from 'socket.io-client';
import { IoMenu } from "react-icons/io5";
import SideBar from '@/components/sideBar';
import InputMessage from '@/components/inputMessage';
import MessageDisplay from '@/components/messageDisplay';

interface ChatPageProps {
    socket: Socket;
}



const ChatPage: React.FC<ChatPageProps> = ({ socket }) => {
    return (
        <>
            <nav className='absolute w-screen flex justify-between items-center h-16 border-b border-secondary'>
                <p className='ml-5 text-primary text-3xl font-bold'>LoveLoop</p>
                <IoMenu className='text-secondary text-4xl mr-5' />
            </nav>
            <div className='h-screen pt-16 flex'>
            <SideBar socket={socket} />
            <MessageDisplay socket={socket} />
            <InputMessage socket={socket} />
            </div>
        </>
    );
}

export default ChatPage;