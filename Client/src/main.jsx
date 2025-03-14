import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './context/auth.context.jsx';
import { ChatProvider } from './context/chat.context.jsx';

createRoot(document.getElementById('root')).render(
      <>
            <UserContextProvider>
                  <ChatProvider>
                        <App />
                        <Toaster />
                  </ChatProvider>

            </UserContextProvider>
      </>
);
