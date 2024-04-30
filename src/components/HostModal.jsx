import { useState, useEffect } from 'react'
import axios from 'axios';
import toTitleCase from '../functions/toTitleCase.js'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import socket from '../functions/socket.js'

const HostModal = ({ isOpen, closeModal, user }) => {

  const [gameName, setGameName] = useState(`${toTitleCase(user.username)}s Game`)
  const [playerLimit, setPlayerLimit] = useState(6)
  const [startingDice, setStartingDice] = useState(5)
  const [gamePassword, setGamePassword] = useState({ required: false, password: '' })
  const userId = useSelector(state => state.user.userId)

  useEffect(() => {
    socket.on('host game data', (data) => {
      console.log('host game data full', data)
      navigate(`/scuttlebutt/lobby/${data.game.gameId}`)
    })
  }, [])

  const navigate = useNavigate()

  const createGame = (e) => {
    e.preventDefault()

    console.log('create game hit', userId)

    const body = {
      name: gameName,
      playerLimit: playerLimit,
      startingDice: startingDice,
      locked: gamePassword.required,
      password: gamePassword.required === false ? 'default' : gamePassword.password,
      userId: userId
    }

    socket.emit('host game', body)
  }

  if (!isOpen) return null;

  return (
    <div className='modal'>
        <button onClick={closeModal}>Close</button>
        <h1>Create a new game</h1>

        <form onSubmit={createGame}>

        <label htmlFor="gameNameInput">Game Name:</label>
        <input
          type="text"
          name="gameName"
          id="gameNameInput"
          placeholder='Name your game'
          value={gameName}
          onChange={e => setGameName(e.target.value)}
          autoComplete='off'
        />

        <span>
        <label htmlFor="gamePassword">Require password to join game?</label>
        <input
          type='checkbox'
          name='gamePassword'
          id='gamePassword'
          onChange={() => setGamePassword({ ...gamePassword, required: !gamePassword.required })}
          autoComplete='off'
          />
        </span>

        {gamePassword.required && (
          <>
          <label htmlFor="gamePasswordInput">Game Password:</label>
          <input
            type="text"
            name="gamePasswordInput"
            id="gamePasswordInput"
            placeholder='Game password'
            value={gamePassword.password}
            onChange={e => setGamePassword({...gamePassword, password: e.target.value })}
          />
          </>
        )}

        <label htmlFor="playerLimitInput">Player Limit:</label>
        <select
          name="playerLimit"
          id="playerLimit"
          value={playerLimit}
          onChange={e => setPlayerLimit(e.target.value)}
        >
          {Array.from({length: 6}, (_, i) => i + 1).map(limit => (
            <option key={`${limit}players`} value={limit}>{limit}</option>
          ))}
        </select>

        <label htmlFor="startingDice">Starting Dice:</label>
        <select
          name="startingDice"
          id="startingDice"
          value={startingDice}
          onChange={e => setStartingDice(e.target.value)}
        >
          {Array.from({length: 10}, (_, i) => i + 1).map(dice => (
            <option key={`${dice}dice`} value={dice}>{dice}</option>
          ))}
        </select>

        <button type="submit">Create Game</button>
      </form>

    </div>
  )
}

export default HostModal