import React from 'react'
import { useState } from 'react'
import Login from '../auth/Login.jsx'
import Register from '../auth/Register.jsx'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()

  const [buttonClicked, setButtonClicked] = useState(false)
  const [register, setRegister] = useState(false)

  const loginClick = () => {
    setButtonClicked(true)
    setRegister(false)
  }

  const registerClick = () => {
    setButtonClicked(true)
    setRegister(true)
  }

  const playAsGuest = () => {
    setButtonClicked(false)
    navigate('/join')
  }

  return (
    <div id='home-div'>
      <h1>Cheater's Chance</h1>

      <div>
      {!buttonClicked? (
        <>
          <button onClick={loginClick}>Login</button>
          <button onClick={registerClick}>Register</button>
        </>
        ) : (
        <>
        {register ? (
            <Register loginClick={loginClick} />
          ) : (
            <Login registerClick={registerClick} />
            )
          }
        </>
        )
      }
      </div>

      <div>
        <button onClick={playAsGuest}>Play as Guest</button>
      </div>

      <div>
        <button onClick={() => navigate('/rules')}>How to Play</button>
      </div>

    </div>
  )
}

export default Home