import React from "react";
import './Modal.css';

const Modal = ({ message, onClose, type }) => {
  return (
    <div className="modal-overlay">
      <div className={`modal ${type}`}>
        <h3>{message}</h3>
        <button className="modal-close" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;
