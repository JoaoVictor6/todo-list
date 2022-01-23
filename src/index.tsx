import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import Auth from './pages/Auth';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/users/:uid/todos" element={<App />} />
        <Route path="/" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
