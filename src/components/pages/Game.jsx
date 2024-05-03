import Player from '../Player'
import Opponent from '../Opponent'
import socket from '../../functions/socket'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Dice from '../Dice.jsx'

const Game = () => {

  const navigate = useNavigate()
  const [isMounted, setIsMounted] = useState(false)

  const user = useSelector(state => state.user)
  const initialGameData = useSelector(state => state.game)

  const [gameData, setGameData] = useState(initialGameData)

  const [bet, setBet] = useState({
    count: gameData.currentCount,
    value: gameData.currentValue === 0 ? 1 : gameData.currentValue
  })

  const self = gameData.players.filter(player => player.user.userId === user.userId)[0]

  const opponents = gameData.players
    .filter(player => player.user.userId !== user.userId)
    .map(opponent => <Opponent key={opponent.user.userId} player={opponent} />)

  const placeBet = () => {

    if (bet.count < gameData.currentCount) {
      alert("You cannot decrease the count.")
      return
    } else if (bet.count == gameData.currentCount && bet.value == gameData.currentValue) {
      alert("You must increase at least the count or value to place a bet.")
    } else if (bet.count == gameData.currentCount && bet.value <= gameData.currentValue) {
      alert("You must increase the dice value if you do not increase the count.")
      return
    }

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

    socket.on('player disconnected', (res) => {
      console.log(res.message, res.playerName)
      setGameData(res.gameData)
    })

  }, [])
  
  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true)
    }, 1000)

    console.log("INITIAL RENDER")

    const handleUnload = () => {
      socket.emit('player disconnect', { 
        playerId: self.playerId,
        gameId: gameData.gameId
      });
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      if (isMounted) {
        console.log("CLEANUP FUNCTION")
        handleUnload()
      }
    }
    
  }, [isMounted])


  const liar = () => {
    console.log(gameData)
    const allDice = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}

    for(let i = 0; i < gameData.players.length; i++){
      // for(let die in gameData.players[i]){
        allDice['1'] += gameData.players[i]['1']
        allDice['2'] += gameData.players[i]['2']
        allDice['3'] += gameData.players[i]['3']
        allDice['4'] += gameData.players[i]['4']
        allDice['5'] += gameData.players[i]['5']
        allDice['6'] += gameData.players[i]['6']
      // }
    }

    console.log('totals', allDice)

  }


  return (
    <div id='game-div'>In-Game

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
              min={1}
              max={6}
              onChange={e => setBet({ ...bet, value: e.target.value })}
            />
            <button onClick={placeBet}>Place yer Bet</button>
          </>
        ) : (
          <button onClick={liar}>LIAR!</button>
        )
        }
      </section>
      <section>
        <Dice turn={gameData.turn} self={self}/>
      </section>

    </div>
  )
}

export default Game