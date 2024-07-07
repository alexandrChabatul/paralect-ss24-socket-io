import { useEffect, useState } from 'react';
import { Chat } from '../components/Chat';
import { Message } from '../types';
import axios from 'axios';

export const LongPolling = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const onSendMessage = (message: Message) => {
    axios.post('http://localhost:3000/long-polling/messages', message);
  };

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/long-polling/messages');
      setMessages((prev) => [...prev, data]);
    } finally {
      subscribe();
    }
  };

  return (
    <>
      <Chat
        chatName="Long polling chat example"
        onSendMessage={onSendMessage}
        messages={messages}
      />
    </>
  );
};
