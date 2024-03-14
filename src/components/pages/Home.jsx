import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../Modal.jsx'

const Home = () => {

  const navigate = useNavigate()

  const [modalOpen, setModalOpen] = useState(false)
  const [register, setRegister] = useState(false)

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const loginClick = () => {
    openModal()
    setRegister(false)
  }

  const registerClick = () => {
    openModal()
    setRegister(true)
  }

  const playAsGuest = () => {
    navigate('/join')
  }

  return (
    <div id='home-div'>
      <h1>Cheater's Chance</h1>

      <Modal 
        isOpen={modalOpen} 
        onClose={closeModal} 
        register={register} 
        loginClick={loginClick}
        registerClick={registerClick}
      />

      <div>
        <button onClick={loginClick}>Login</button>
        <button onClick={registerClick}>Register</button>
      </div>

      <div>
        <button onClick={playAsGuest}>Play as Guest</button>
      </div>

      <div>
        <button 
          onClick={() => navigate('/rules')}
          >How to Play
        </button>
      </div>

    </div>
  )
}

export default Home