import express, { Request, Response } from 'express';
import messagesController from '../controllers/messages.controller';

export const router = express.Router();

router.get('/messages', messagesController.getMessages);

router.post('/messages', messagesController.publishMessage);
 