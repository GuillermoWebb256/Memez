import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from './Header.jsx';
import Meme from './Meme.jsx';
import './styles/style.css';


const App = () => {
  return (
    <div>
      <MyComponent />
      <Meme />
      
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

