import React, { StrictMode } from 'react';
import { ColorModeScript } from '@chakra-ui/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme'
import ReactDOM from 'react-dom';
import App from './App';




ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}> 
      <CssBaseline/>
      <ColorModeScript />
      <App />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);

