import Login from "./auth/Login";
import Register from "./auth/Register";

const AuthModal = ({ isOpen, onClose, register, loginClick, registerClick }) => {

  if (!isOpen) {
    return null
  }

  return (
    <div className="modal">
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

export default AuthModal;
