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
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <World />
      <div className="disclaimer" style={{ position: 'absolute', bottom: '1vh', maxWidth: '100vh', fontSize: '1.2vh'}}>Original game by <a href='https://medienwerkstatt-online.de/' style={{color: 'black'}}>Medienwerkstatt Mühlacker Verlagsges.mbH</a>. No original arts or code were used.</div>
    </div>
  )
}

export default App;
