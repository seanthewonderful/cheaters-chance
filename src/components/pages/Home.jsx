import React from 'react'
import { useState } from 'react'
import Login from '../auth/Login.jsx'
import Register from '../auth/Register.jsx'

const Home = () => {

  console.log("Home")

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
            <Register setRegister={setRegister} />
          ) : (
            <Login setRegister={setRegister} />
            )
          }
        </>
        )
      }
      </div>

    </div>
  )
}

export default Home