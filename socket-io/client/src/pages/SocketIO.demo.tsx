import { useEffect, useRef, useState } from 'react';
import { Chat } from '../components/Chat';
import { Message } from '../types';
import { io, Socket } from 'socket.io-client';
import { Button, Group, TextInput } from '@mantine/core';

export const SocketIODemo = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [room, setRoom] = useState('');
  const [connectedRoom, setConnectedRoom] = useState('');
  const socket = useRef<Socket>();

  const onSendMessage = (message: Message) => {
    socket.current?.emit('message:publish', { room: connectedRoom, message });
  };

  const connect = () => {
    socket.current = io('http://localhost:3000/');
    socket.current.on('message:new', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });
    socket.current.on('room:joined', (room: string) => {
      setConnectedRoom(room);
    });
  };

  const changeRoom = () => {
    socket.current?.emit('room:join', room);
    setMessages([])
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
