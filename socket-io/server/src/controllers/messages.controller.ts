import { Request, Response } from "express";
import { Message } from "../types";

const messages: Message[] = [];

const getMessages = (req: Request, res: Response) => {
  res.send(messages);
}

const publishMessage = (req: Request, res: Response) => {
  messages.push(req.body);
  res.send(messages);
}

export default {
  publishMessage,
  getMessages,
}