import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

import socket from '../functions/socket.js'


const JoinModal = ({ game, toggleModal }) => {

  const navigate = useNavigate()

  const [password, setPassword] = useState('')

  const userId = useSelector(state => state.user.userId)

  useEffect(() => {

    socket.on('goodbye', (res) => {
      console.log('goodbye hit')
      console.log('res', res.data)
    })

    socket.on('join game hit', (res) => {
      console.log("FOUND GAME ID: ", res.data.foundGame.gameId)
      navigate(`/scuttlebutt/lobby/${res.data.foundGame.gameId}`)
    })

  }, [socket])

  const onSubmit = () => {
    if (game.password !== 'default') {
      socket.emit('join game', { name: game.name, password: password, userId })
    } else {
      socket.emit('join game', { name: game.name, password: 'default', userId })
    }
  }

  return game.password !== 'default' ? (
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