import express, { Request, Response } from 'express';
import shortPollingController from '../controllers/short-polling.controller';
import longPollingController from '../controllers/long-polling.controller';
import serverSendEventsController from '../controllers/server-send-events.controller';

export const router = express.Router();

// Short polling
router.get('/short-polling/messages', shortPollingController.getMessages);
router.post('/short-polling/messages', shortPollingController.publishMessage);

// Long polling
router.get('/long-polling/messages', longPollingController.getMessages);
router.post('/long-polling/messages', longPollingController.publishMessage);

// Long polling
router.get('/sse/messages', serverSendEventsController.getMessages);
router.post('/sse/messages', serverSendEventsController.publishMessage);
 