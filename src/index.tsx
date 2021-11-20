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
          <Route path="/" element={<App />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
