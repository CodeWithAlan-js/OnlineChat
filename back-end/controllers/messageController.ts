import { MessageModel, IMessage } from "../models/messageModels";
import { Request, Response } from "express";

export const addMessage = async (req: Request, res: Response) => {
    const message = new MessageModel(req.body);
    await message.save();
    res.json(message);
}    
