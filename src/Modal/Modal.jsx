import react from "react";

import "./Modal.styles.scss";

const Modal = ({ isActive, onClose, children, title }) => {
  return (
    <div
      className={isActive ? "modal active" : "modal"}
      onClick={() => onClose()}
    >
      <div
        className={isActive ? "modal__content active" : "modal__content"}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <header className="modal__header">
          <p className="modal__request">{title}</p>
          <button className="modal__button--close" onClick={onClose}>
            &times;
          </button>
        </header>

        {children}
      </div>
    </div>
  );
};

export default Modal;
