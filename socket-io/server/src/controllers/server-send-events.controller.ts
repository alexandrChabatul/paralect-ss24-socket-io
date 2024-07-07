import { Request, Response } from 'express';
import { Message } from '../types';
import emitter from '../services/event-emitter-service';

// For short polling
const getMessages = (req: Request, res: Response) => {
  res.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  });
  emitter.on('newSSEMessage', (message) => {
      res.write(`data: ${JSON.stringify(message)} \n\n`)
  })
};

const publishMessage = (req: Request, res: Response) => {
  emitter.emit('newSSEMessage', req.body);
  res.status(200).send();
};

export default {
  publishMessage,
  getMessages,
};
