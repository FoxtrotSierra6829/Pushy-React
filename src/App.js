import React from 'react'
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
      display: 'flex',
      
      '-webkit-justify-content': 'center',
      '-ms-flex-pack': 'center',
      'justify-content': 'center',

      '-webkit-align-items': 'center',
      '-ms-flex-align': 'center',
      'align-items': 'center',
    }}>
      <World />
      <div class="disclaimer" style={{ position: 'absolute', bottom: '1vh', maxWidth: '100vh', fontSize: '1.2vh'}}>Original game by <a href='https://medienwerkstatt-online.de/' style={{color: 'black'}}>Medienwerkstatt Mühlacker Verlagsges.mbH</a>. No original arts or code were used.</div>
    </div>
  )
}

export default App;
