import { FC, useState } from 'react';
import { Message } from '../types';
import { Button, Group, Stack, Text, TextInput } from '@mantine/core';
import './chat.css';

interface ChatProps {
  chatName: string;
  onSendMessage: (message: Message) => void;
  messages: Message[];
}

export const Chat: FC<ChatProps> = ({ chatName, onSendMessage, messages }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    onSendMessage({
      author: name,
      message,
      date: new Date().toISOString(),
    });
    setMessage('');
  };
  return (
    <Stack
      w="100%"
      h="90%"
      mt={20}
    >
      <Text
        title="1"
        size="xl"
      >
        {chatName}
      </Text>
      <Group
        h="100%"
        w="100%"
        wrap="nowrap"
        align="start"
      >
        <Stack
          justify="start"
          styles={{
            root: {
              width: '50%',
              height: '100%',
              overflowY: 'scroll',
              oveflowX: 'hidden',
              background: 'white',
              borderRadius: 10,
              padding: 10,
            },
          }}
          className="chat"
        >
          {messages.map((message) => (
            <Stack
              p={10}
              w="90%"
              key={message.author + message.date}
              styles={{ root: { borderRadius: 10 } }}
              className="message"
            >
              <Group>
                <Text>{message.author}</Text>
                <Text
                  component="span"
                  c="dimmed"
                >
                  {message.date}
                </Text>
              </Group>
              <Text>{message.message}</Text>
            </Stack>
          ))}
        </Stack>
        <Stack
          justify="start"
          styles={{
            root: {
              flexGrow: 1,
              oveflowY: 'scroll',
              background: 'white',
              borderRadius: 10,
              padding: '20px',
            },
          }}
        >
          <form onSubmit={sendMessage}>
            <Stack>
              <TextInput
                label="Name"
                placeholder="Enter your name"
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
              />
              <TextInput
                label="Message"
                placeholder="Enter your message"
                value={message}
                onChange={(event) => setMessage(event.currentTarget.value)}
              />
              <Button onClick={() => sendMessage()}>Send</Button>
            </Stack>
          </form>
        </Stack>
      </Group>
    </Stack>
  );
};
