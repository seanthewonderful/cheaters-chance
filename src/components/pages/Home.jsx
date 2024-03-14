import React from 'react'
import { useState } from 'react'
import Login from '../auth/Login.jsx'
import Register from '../auth/Register.jsx'
import Modal from '../Modal.jsx'
import { useNavigate } from 'react-router-dom'

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

      {register && (
        <Modal 
          isOpen={modalOpen} 
          onClose={closeModal} 
          register={true} 
        />
      )}
      {!register && (
        <Modal 
          isOpen={modalOpen} 
          onClose={closeModal} 
          register={false} 
        />
      )}

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