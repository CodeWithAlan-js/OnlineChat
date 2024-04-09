import mongoose from 'mongoose';

interface IMessage {
    message: string;
    }

const messageSchema = new mongoose.Schema<IMessage>({
    message: String,
});

const MessageModel = mongoose.model('Message', messageSchema);

export { MessageModel, IMessage};
