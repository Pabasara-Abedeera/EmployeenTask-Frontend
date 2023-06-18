import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import {createTheme} from '@material-ui/core'
import {ThemeProvider} from '@material-ui/styles'
import {BrowserRouter} from 'react-router-dom'
const theme=createTheme({
  palette:{
    primary:{
      main:'#061a99',
      light:'#3c44b126'
    },
    secondary:{
      main:'#ab2807',
      light:'#f7cac1'
    },
    basic:{
      main:'#ab2807',
      light:'#edf7f1'
    }

  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </ThemeProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
