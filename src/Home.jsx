import logo from './money.png';
import slogan from './slogan.png';
import happiness from './happiness.png';
import './Home.css';

function App() {
  return (
    <div className="App"> 
      <header className='App-header'>
        <img src={slogan} className="App-slogan" alt="slogan" />
        <img src={happiness} className="App-cloud" alt="happiness" />
      </header>    
    </div>
  );
}

export default App;
