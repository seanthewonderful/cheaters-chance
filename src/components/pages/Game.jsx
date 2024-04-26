import Player from '../Player'
import Opponent from '../Opponent'
import socket from '../../functions/socket'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Game = () => {

  const navigate = useNavigate()

  const user = useSelector(state => state.user)
  const initialGameData = useSelector(state => state.game)
  console.log('game page initial data', initialGameData)

  const [gameData, setGameData] = useState(initialGameData)
  const [bet, setBet] = useState({
    count: gameData.currentCount,
    value: gameData.currentValue
  })

  const self = gameData.players.filter(player => player.user.userId === user.userId)[0]
  console.log(self)

  const opponents = gameData.players
    .filter(player => player.user.userId !== user.userId)
    .map(opponent => <Opponent player={opponent} />)

  const placeBet = () => {
    socket.emit('place bet', { 
      bet, 
      playerId: self.playerId, 
      gameId: gameData.gameId 
    })
  }

  useEffect(() => {
    if (!initialGameData) {
      navigate("/scuttlebutt/join")
    }
  }, [])

  useEffect(() => {
    socket.on('bet placed', (res) => {
      setGameData(res.gameData)
    })
  }, [])

  return (
    <div id='game-div'>
      <section>
        <h3>Current Bet</h3>
        <p>Dice Count: {gameData.currentCount}</p>
        <p>Dice Value: {gameData.currentValue}</p>
        <p>Player Turn: {gameData.players[gameData.turn].user.username}</p>
      </section>
      <section>Opponents:
        {opponents}
      </section>
      <section>
        {<Player player={self} />}
        {gameData.turn === self.turn ? (
          <>
            <h3>Bet:</h3>
            Count:
            <input
              type='number'
              value={bet.count}
              min={gameData.currentCount}
              onChange={e => setBet({ ...bet, count: e.target.value })}
            />
            Dice Value:
            <input
              type='number'
              value={bet.value}
              min={0}
              max={6}
              onChange={e => setBet({ ...bet, value: e.target.value })}
            />
            <button onClick={placeBet}>Place yer Bet</button>
          </>
        ) : (
          <button>LIAR!</button>
        )
        }
      </section>
    </div>
  )
}

export default Game