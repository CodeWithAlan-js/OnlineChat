import * as React from 'react';
import { Socket } from 'socket.io-client';

interface ChatPageProps {
    socket: Socket;
}



const ChatPage: React.FC<ChatPageProps> = ({ socket }) => {
    return (
        <>
            <nav>
                <p className=' text-text-primary'>LoveLoop</p>
            </nav>
        </>
    );
}

export default ChatPage;