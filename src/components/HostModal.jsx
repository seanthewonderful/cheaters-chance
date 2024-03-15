import React from 'react'

const HostModal = ({ isOpen, closeModal }) => {

  if (!isOpen) return null;

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
        <input type="text" name="gameName" id="gameNameInput" placeholder='Name your game' />
        <label htmlFor="gameDescriptionInput">Public or private game?</label>
        <span id='publicPrivateCheck'>
          <label htmlFor="publicCheck">Public</label>
          <input type="checkbox" name="publicCheck" id="publicCheck" />
          <label htmlFor="privateCheck">Private</label>
          <input type='checkbox' name='privateCheck' id='privateCheck' />
        </span>
        <label htmlFor="gameDescriptionInput">(Public = anyone can join your game)</label>
        <label htmlFor="gameDescriptionInput">(Private = players must provide a code to join your game)</label>
        <button type="submit">Create Game</button>
      </form>

    </div>
  )
}

export default HostModal