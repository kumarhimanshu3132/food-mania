import React from 'react';
import ReactDom from 'react-dom';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgba(33, 37, 41, 0.95)', // Matches your dark glass UI
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '80%',
  width: '80%',
  borderRadius: '15px',
  padding: '20px',
  overflowY: 'auto'
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}

export default function Modal({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div style={MODAL_STYLES}>
        <button 
            className='btn btn-danger fs-5 fw-bold' 
            style={{ position: "absolute", right: "20px", top: "20px" }} 
            onClick={onClose}
        > 
            X 
        </button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  )
}