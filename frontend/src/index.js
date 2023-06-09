import React from 'react';
import {createRoot} from 'react-dom/client';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Encrypt from './Components/encrypt';
import Header from './Components/header';
import Decrypt from './Components/decrypt';
import Chat from './Components/chat/chat';
import SideBar from './Components/sidebar';
import About from './Components/about';
import Footer from './Components/footer';

function Main()
{
  return(
    <section className='my-dark-bg'>
      <Router>
        {/* <Header /> */}
        <SideBar />
        <section className='mt-[12vh]'>
        <Routes>
          <Route path='/' element={<Encrypt />} />
          <Route path='/decrypt' element={<Decrypt />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/about' element={<About />} />
        </Routes>
        </section>
        <Footer />
      </Router>
    </section>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<Main />);
