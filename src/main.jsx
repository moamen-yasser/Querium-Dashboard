import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from './AuthContext/AuthProvider.jsx';
import { Provider } from 'react-redux';
import { Store } from './Service/Store.jsx';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <AuthProvider>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Notifications position="top-right" />
          <App />
        </MantineProvider>
      </AuthProvider>
      </Provider>
  </StrictMode>
)

