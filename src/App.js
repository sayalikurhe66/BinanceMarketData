import logo from './logo.svg';
import './App.css';
import BinanceChart from './BinanceChart';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//       <BinanceChart />
//     </div>
//   );
// }

function App() {
  return (
    <div className='App'>
      <h1>Binance Market Data</h1>
      <BinanceChart />
    </div>
  );
}

export default App;
