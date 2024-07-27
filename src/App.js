import React from 'react';
import QRCodeGenerator from './components/QRCodeGenerator';

function App() {
  return (
    <div className="App">
      <h1>
        Generador de QR by: 
        <a 
          href="https://github.com/JotaDevMan" 
          target="_blank" 
          rel="noopener noreferrer"
          className="highlight">
          JotaDevMan </a>
      </h1>
      <QRCodeGenerator />
    </div>
  );
}

export default App;
