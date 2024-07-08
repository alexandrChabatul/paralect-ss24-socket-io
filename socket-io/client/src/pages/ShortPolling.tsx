import { useEffect, useState } from 'react';
import { Chat } from '../components/Chat';
import { Message } from '../types';
import axios from 'axios';
import { NumberInput } from '@mantine/core';

export const ShortPolling = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [delay, setDelay] = useState(2);

  const onSendMessage = (message: Message) => {
    axios.post('http://localhost:3000/short-polling/messages', message);
    setMessages((prev) => [...prev, message]);
  };

  useEffect(() => {
    let id: number;
    const fetchMessages = async () => {
      try {
        const res = await axios.get('http://localhost:3000/short-polling/messages');
        setMessages(res.data);
      } finally {
        id = setTimeout(fetchMessages, delay * 1000);
      }
    };
    id = setTimeout(fetchMessages, delay * 1000);
    return () => clearTimeout(id);
  });

  return (
    <>
      <NumberInput
        label="Delay"
        w="50%"
        value={delay}
        onChange={(v) => setDelay(+v)}
      />
      <Chat
        chatName="Short polling chat example"
        onSendMessage={onSendMessage}
        messages={messages}
      />
    </>
  );
};
