// src/components/QRCodeGenerator.js
import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';
import '../qr.css';

function QRCodeGenerator() {
  const [input, setInput] = useState('');
  const [qrValue, setQrValue] = useState('');
  const qrRef = useRef();

  const handleGenerateQR = () => {
    setQrValue(input);
  };

  const handleDownloadQR = async () => {
    if (qrRef.current) {
      const dataUrl = await toPng(qrRef.current);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'qr-code.png';
      link.click();
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Enter URL or text" 
      />
      <button onClick={handleGenerateQR}>Generate QR</button>
      {qrValue && (
        <div className='qr-container'>
          <div className='qr-generado' ref={qrRef}>
            <QRCode value={qrValue} />
          </div>
          <button className='boton-descarga' onClick={handleDownloadQR}>
            <span>Download QR</span>
          </button>
          <a 
            className='texto-agregado' 
            href='https://www.youtube.com/shorts/QR8CVkmJhLU' 
            target='_blank' 
            rel='noopener noreferrer'>
            Animacion del boton by: <span className='highlight'>MiduDev</span>
          </a>
        </div>
      )}
    </div>
  );
}

export default QRCodeGenerator;
