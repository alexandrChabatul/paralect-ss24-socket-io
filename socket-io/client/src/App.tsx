import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ShortPolling } from './pages/ShortPolling';
import { LongPolling } from './pages/LongPolling';
import { ServerSendEvents } from './pages/ServerSendEvents';

const router = createBrowserRouter([
  {
    path: '/short-polling',
    element: <ShortPolling />,
  },
  {
    path: '/long-polling',
    element: <LongPolling />,
  },
  {
    path: '/sse',
    element: <ServerSendEvents />,
  },
]);

function App() {
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
