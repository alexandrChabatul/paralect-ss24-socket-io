import { useEffect, useState } from 'react';
import { Chat } from '../components/Chat';
import { Message } from '../types';
// import { Button, Group, TextInput } from '@mantine/core';

export const SocketIO = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const onSendMessage = (message: Message) => {};

  const connect = () => {};

  useEffect(() => {
    connect();
  }, []);

  return (
    <>
      {/* <Group>
        <TextInput
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Enter room name"
        />
        <Button onClick={changeRoom}>Join</Button>
      </Group> */}
      <Chat
        chatName={'Socket.IO chat example'}
        onSendMessage={onSendMessage}
        messages={messages}
      />
    </>
  );
};
