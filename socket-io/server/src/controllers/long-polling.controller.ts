import { Request, Response } from 'express';
import emitter from '../services/event-emitter.service';

// For long polling
const getMessages = (req: Request, res: Response) => {
  emitter.once('newMessage', (message) => {
    res.json(message);
  });
};

const publishMessage = (req: Request, res: Response) => {
  emitter.emit('newMessage', req.body);
  res.status(200).send();
};

export default {
  publishMessage,
  getMessages,
};
