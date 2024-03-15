import { useState } from 'react'
import axios from 'axios';
import toTitleCase from '../functions/toTitleCase.js'
import { useNavigate } from 'react-router-dom';

const HostModal = ({ isOpen, closeModal, user }) => {

  if (!isOpen) return null;

  const [gameName, setGameName] = useState(`${toTitleCase(user.username)}s Game`)
  const [playerLimit, setPlayerLimit] = useState(6)
  const [startingDice, setStartingDice] = useState(5)
  const [gamePassword, setGamePassword] = useState({ required: false, password: '' })

  const navigate = useNavigate()

  const createGame = (e) => {
    e.preventDefault()

    const body = {
      gameName,
      playerLimit,
      startingDice,
      locked: gamePassword.required,
      password: gamePassword
    }

    axios.post(`/api/newGame`, body)
    .then(res => {
      console.log(res.data.message)
       closeModal()
       navigate('/scuttlebutt/profile')
     })
    .catch(err => console.log(err))
  }

  return (
    <div style={{ 
      position: 'fixed', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)', 
      backgroundColor: 'white', 
      padding: '20px', 
      zIndex: 1000 
      }}>
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
        />
        
        <span>
        <label htmlFor="gamePassword">Require password to join game?</label>
        <input 
          type='checkbox' 
          name='gamePassword' 
          id='gamePassword' 
          onChange={() => setGamePassword({ ...gamePassword, required: !gamePassword.required })}
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