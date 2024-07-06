import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ShortPolling } from './pages/ShortPolling';

const router = createBrowserRouter([
  {
    path: '/short-polling',
    element: <ShortPolling />,
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
