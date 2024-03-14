import Login from "./auth/Login";
import Register from "./auth/Register";

const Modal = ({ isOpen, onClose, register, loginClick, registerClick }) => {

  if (!isOpen) return null;

  return (
    <div style={{ 
      position: 'fixed', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)', 
      backgroundColor: 'white', 
      padding: '20px', 
      zIndex: 1000 
      }}>
        <button onClick={onClose}>Close</button>

      {!register && (
        <Login 
          registerClick={registerClick}
        />
      )}
      {register && (
        <Register 
          loginClick={loginClick}
        />
      )}
    </div>
  );
};

export default Modal;
