import express, { Express, Request, Response, NextFunction } from 'express';
import { router } from './routes/router';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { createServer } from "http";
import { Server } from "socket.io";
import socketIoController from './controllers/socket-io.controller';
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";


const appid = process.env.APPID || 3000;
const redisUrl = 'redis://redis:6379';

const app: Express = express();
const httpServer = createServer(app);
const pubClient = createClient({ url: redisUrl });
const subClient = pubClient.duplicate();
Promise.all([
  pubClient.connect(),
  subClient.connect()
]).then(() => {
  const io = new Server(httpServer, { 
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
    adapter: createAdapter(pubClient, subClient)
   });
  
  io.on("connection", (socket) => {
    console.log("a user connected");
    socketIoController.handleMessage(socket, io);
  });
  
})

app.use(cors());
app.use(morgan('short'));
app.use(bodyParser.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

httpServer.listen(appid, () => {
  console.log(`${appid}: Server is running at http://localhost:${appid}`);
});
