import React from 'react';
import {createRoot} from 'react-dom/client';
import './App.css';
import EncryptAndDecrypt from './Components/encAndDec';

function Main()
{
  return(
    <>
      <EncryptAndDecrypt />
    </>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<Main />);
