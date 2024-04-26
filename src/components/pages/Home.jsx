import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AuthModal from '../AuthModal.jsx'
import sessionCheck from '../../functions/sessionCheck.js'
import axios from 'axios'
import Dice from '../Dice.jsx'

// import io from 'socket.io-client'

// const URL = 'http://localhost:2319'
// const socket = io.connect(URL)

import socket from '../../functions/socket.js'

const Home = () => {

  const checkSocket = () => {
    socket.emit('greet', (res) => {
      console.log('response', res)
    })
  }

  useEffect(() => {

    socket.on('goodbye', (res) => {
      console.log('goodbye hit')
      console.log('res', res.data)
    })

    socket.on('jg hit', (res) => {
      console.log('fe jg hit', res.data)
    })

  }, [socket])

  const user = useSelector(state => state.user)
  const [modalOpen, setModalOpen] = useState(false)
  const [register, setRegister] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

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

      <AuthModal
        isOpen={modalOpen}
        onClose={closeModal}
        register={register}
        loginClick={loginClick}
        registerClick={registerClick}
      />

      <div>
        {!user && <section>
          <button onClick={loginClick}>Login</button>
          <button onClick={registerClick}>Register</button>
        </section>}
        {user && <button onClick={logoutClick}>Logout</button>}
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

      <button onClick={checkSocket}>Click me</button>

      {/* <Dice /> */}

    </div>
  )
}

export default Home