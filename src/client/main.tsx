import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './pages/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/index.css';
import Onboard from './pages/Onboard';
import Home from './pages/Home';
const queryClient = new QueryClient();
const rootElement = document.getElementById('root') as HTMLElement;
const theme = extendTheme({
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  colors: {
    brand: {
      green: '#20DC49',
    },
  },
});
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/onboard/:identifier',
    element: <Onboard />,
  },
  {
    path: '/home/:identifier',
    element: <Home />,
  },
]);
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
