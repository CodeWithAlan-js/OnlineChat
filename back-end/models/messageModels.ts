import mongoose from 'mongoose';

interface IMessage {
    content: string;
    user: string;
    room: string;
    }

const messageSchema = new mongoose.Schema<IMessage>({
    content: String,
    user: String,
    room: String,
});

const MessageModel = mongoose.model('Message', messageSchema);

export { MessageModel, IMessage};
