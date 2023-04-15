import React from 'react';
import {createRoot} from 'react-dom/client';
import './App.css';

function Main()
{
  return(
    <>
      <div className='text-red-700 text-3xl font-bold underline'>Hello</div>
    </>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<Main />);
