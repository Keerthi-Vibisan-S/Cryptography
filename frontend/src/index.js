import React from 'react';
import {createRoot} from 'react-dom/client';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Encrypt from './Components/encrypt';
import Header from './Components/header';
import Decrypt from './Components/decrypt';
import Chat from './Components/chat/chat';

function Main()
{
  return(
    <section>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Encrypt />} />
          <Route path='/decrypt' element={<Decrypt />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </Router>
    </section>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<Main />);
