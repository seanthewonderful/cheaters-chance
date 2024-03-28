import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

import socket from '../functions/socket.js'


const JoinModal = ({ game, toggleModal }) => {

  const navigate = useNavigate()

  const [password, setPassword] = useState('')

  const userId = useSelector(state => state.userId)

  useEffect(() => {

    socket.on('goodbye', (res) => {
      console.log('goodbye hit')
      console.log('res', res.data)
    })

    socket.on('join game hit', (res) => {

      navigate(`/scuttlebutt/lobby/${res.data.foundGame.gameId}`)
    })

  }, [socket])


  const onSubmit = () => {
    if (game.password !== 'guest') {
      socket.emit('joinGame', { name: game.name, password: password, userId })
    } else {
      socket.emit('joinGame', { name: game.name, password: 'guest', userId })
    }

  }

  return game.password !== 'guest' ? (
    <div className='modal'>
      <section className='modal-section'>
        <p>Enter Password</p>
        <input type="text" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
        <button onClick={onSubmit}>Submit</button>
        <button onClick={toggleModal}>Cancel</button>
      </section>

    </div>

  ) : (

    <div className='modal'>
      <section className='modal-section'>
        <p>Are you sure you want to join {game.name}?</p>
        <button onClick={onSubmit}>Yes</button>
        <button onClick={toggleModal}>No</button>
      </section>
    </div>
  )
}

export default JoinModal