import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Modal from '../Modal.jsx'
import sessionCheck from '../../functions/sessionCheck.js'

const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  console.log(user)

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

  useEffect(() => {
    sessionCheck(dispatch)
  }, [])

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