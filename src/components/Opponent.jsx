import React from 'react'

const Opponent = ({ player }) => {

  return (
    <div id='opponent-div'>
      <p>Player: {player.user.username}</p>
      <p>Total Dice: {player.dice}</p>
    </div>
  )
}

export default Opponent