import Player from '../Player'
import Opponent from '../Opponent'
import Dice from '../Dice'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const Game = () => {

  const initialGameData = useSelector(state => state.game)
  console.log(initialGameData)

  const [gameData, setGameData] = useState(initialGameData)


  return (
    <div>Game</div>
  )
}

export default Game