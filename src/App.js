import React, {Component} from 'react'
import World from './world'

function App() {
  window.addEventListener('contextmenu', function (e) { 
    // do something here... 
    e.preventDefault();
  }, false);
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: '-webkit-flex',
      display: '-ms-flexbox',
      display: 'flex',
      
      '-webkit-justify-content': 'center',
      '-ms-flex-pack': 'center',
      'justify-content': 'center',

      '-webkit-align-items': 'center',
      '-ms-flex-align': 'center',
      'align-items': 'center',
    }}>
      <World />
    </div>
  )
}

export default App;
