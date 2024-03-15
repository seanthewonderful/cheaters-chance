import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../Modal.jsx'
import sessionCheck from '../../functions/sessionCheck.js'
import axios from 'axios'

const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
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

  const logoutClick = () => {
    axios.get(`/api/logout`)
    .then(res => {
      if (res.status === 200) {
        window.location.reload()
      }
    })
  }

  const playAsGuest = () => {
    navigate('/scuttlebutt/join')
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
        <button onClick={logoutClick}>Logout</button>
      </div>

      <div>
        <button onClick={playAsGuest}>Play as Guest</button>
      </div>

      <div>
        <button 
          onClick={() => navigate('/scuttlebutt/rules')}
          >
            How to Play
        </button>
      </div>

      <div>
      {user &&
        <button
        onClick={() => navigate('/scuttlebutt/profile')}
        >
          Profile
        </button>
      }
      </div>

    </div>
  )
}

export default Home