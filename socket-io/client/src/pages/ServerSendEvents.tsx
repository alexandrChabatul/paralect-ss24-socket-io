import { useEffect, useState } from 'react';
import { Chat } from '../components/Chat';
import { Message } from '../types';
import axios from 'axios';

export const ServerSendEvents = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const onSendMessage = (message: Message) => {
    axios.post('http://localhost:3000/sse/messages', message);
  };

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    const eventSource = new EventSource(`http://localhost:3000/sse/messages`);
    eventSource.onmessage = function (event) {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };
  };

  return (
    <>
      <Chat
        chatName="Server send events chat example"
        onSendMessage={onSendMessage}
        messages={messages}
      />
    </>
  );
};
