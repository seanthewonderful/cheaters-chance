import React, { useState } from 'react'

const HostModal = ({ isOpen, closeModal }) => {

  if (!isOpen) return null;

  const [gameName, setGameName] = useState('')
  const [playerLimit, setPlayerLimit] = useState(4)
  const [startingDice, setStartingDice] = useState(5)
  const [gamePassword, setGamePassword] = useState({ required: false, password: '' })

  const createGame = (e) => {
    e.preventDefault()

    console.log("Game created! Well, not really")
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
        <input 
          type="number"
          name="playerLimitInput"
          id="playerLimitInput"
          placeholder='Number of players'
          onChange={e => setPlayerLimit(e.target.value)}
        />

        <label htmlFor="startingDiceInput">Starting Dice:</label>
        <input
          type="number"
          name="startingDiceInput"
          id="startingDiceInput"
          placeholder='Number of dice to roll'
          onChange={e => setStartingDice(e.target.value)}
        />
        
        <button type="submit">Create Game</button>
      </form>

    </div>
  )
}

export default HostModal