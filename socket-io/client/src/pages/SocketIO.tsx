import { useEffect, useRef, useState } from 'react';
import { Chat } from '../components/Chat';
import { Message } from '../types';
import { Button, Group, TextInput } from '@mantine/core';
import { io, Socket } from 'socket.io-client';

export const SocketIO = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState('');
  const [connectedRoom, setConnectedRoom] = useState('');
  const socketRef = useRef<Socket>();

  const onSendMessage = (message: Message) => {
    socketRef.current?.emit('message:publish', { room: connectedRoom, message });
  };

  const connect = () => {
    socketRef.current = io('http://localhost:3000/', { withCredentials: true });
    socketRef.current.on('message:new', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });
    socketRef.current.on('room:joined', (room: string) => {
      setConnectedRoom(room);
      setMessages([]);
    });
  };

  const changeRoom = () => {
    socketRef.current?.emit('room:join', room);
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <>
      <Group>
        <TextInput
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Enter room name"
        />
        <Button onClick={changeRoom}>Join</Button>
      </Group>
      <Chat
        chatName={connectedRoom || 'Socket.IO chat example'}
        onSendMessage={onSendMessage}
        messages={messages}
      />
    </>
  );
};
