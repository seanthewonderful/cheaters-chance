import { useState } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";

const Modal = ({ isOpen, onClose, register }) => {

  const [registerModal, setRegisterModal] = useState(register);

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}>

      {!registerModal && (
        <Login 
          registerModal={registerModal}
          setRegisterModal={setRegisterModal} 
        />
      )}
      {registerModal && (
        <Register 
          registerModal={registerModal}
          setRegisterModal={setRegisterModal} 
        />
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Modal;
