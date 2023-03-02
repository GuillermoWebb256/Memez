import React from 'react';
import { createRoot } from 'react-dom';
import './styles/style.css';
import Header from './Header';
import Meme from './Meme';



createRoot(document.getElementById('root')).render(
  <>
    <Header />
    <Meme />
  
  </>
);



