import { Server, Socket } from "socket.io";
import { Message } from "../types";

const handleMessage = (socket: Socket, io: Server) => {
  socket.on('message:publish', (data:  { room: string, message: Message } ) => {
    io.to(data.room).emit('message:new', data.message);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('room:join', (room: string) => {
    socket.rooms.forEach((r) => socket.leave(r));
    socket.join(room);
    console.log(`user ${socket.id} joined room ${room}`);
    socket.emit('room:joined', room);
  });
};

export default {
  handleMessage,
}