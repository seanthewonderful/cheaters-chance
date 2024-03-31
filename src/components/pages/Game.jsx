import Player from '../Player'
import Opponent from '../Opponent'
import Dice from '../Dice'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Game = () => {

  const initialGameData = useSelector(state => state.game)
  console.log('game page initial data', initialGameData)

  const [gameData, setGameData] = useState(initialGameData)

  const navigate = useNavigate()

  useEffect(() => {
    if (!initialGameData) {
      navigate("/scuttlebutt/join")
    }
  })

  return (
    <div>Game</div>
  )
}

export default Game