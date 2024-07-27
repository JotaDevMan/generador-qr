import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import '../qr.css';

function GeneradorCodigoQR() {
  const [input, setInput] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const canvasRef = useRef();

  const manejarGenerarQR = () => {
    setMostrarModal(true);
  };

  const manejarConfirmarQR = () => {
    setQrValue(input);
    setMostrarModal(false);
  };

  const manejarDescargarQR = () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'qr-generado.png';
      link.click();
    }
  };

  useEffect(() => {
    if (qrValue) {
      QRCode.toCanvas(canvasRef.current, qrValue, { width: 256 }, (error) => {
        if (error) console.error(error);
      });
    }
  }, [qrValue]);

  const manejarCerrarModal = () => {
    setMostrarModal(false);
  };

  return (
    <div>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Ingresar URL" 
      />
      <button onClick={manejarGenerarQR}>Generar QR</button>
      {qrValue && (
        <div className='qr-container'>
          <canvas ref={canvasRef}></canvas>
          <button className='boton-descarga' onClick={manejarDescargarQR}>
            <span>Descargar QR</span>
          </button>
          <a 
            className='texto-agregado' 
            href='https://www.youtube.com/shorts/QR8CVkmJhLU' 
            target='_blank' 
            rel='noopener noreferrer'>
            Animación del botón por: <span className='highlight'>MiduDev</span>
          </a>
        </div>
      )}
      {mostrarModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmación QR</h2>
            <p>¿Estás seguro de generar este QR?</p>
            <p><strong>{input}</strong></p>
            <button onClick={manejarConfirmarQR}>Confirmar</button>
            <button onClick={manejarCerrarModal}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GeneradorCodigoQR;
