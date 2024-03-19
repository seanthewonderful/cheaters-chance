import {useState, useEffect} from 'react'
import JoinModal from './JoinModal'

const GameListItem = ({game}) => {

  const [showModal, setShowModal] = useState(false)

  game.name = game.name.replace("''", "'")

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const handleClick = () => {
    toggleModal()
  }


  return (
    <>
      <div className='game-list-item' key={game.gameId} onClick={handleClick}>
        <p>Name: {game.name}</p>
        <p>Players: {game.players.length}/{game.playerLimit}</p>
        <p>Starting Dice: {game.startingDice}</p>
      </div>
      {showModal && <JoinModal game={game} toggleModal={toggleModal}/>}
    </>
  )
}

export default GameListItem