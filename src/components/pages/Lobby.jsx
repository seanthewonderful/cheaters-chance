import { useEffect, useState } from 'react'
import Player from '../Player'
import Opponent from '../Opponent'
import Dice from '../Dice'
import { useParams } from 'react-router-dom'

import socket from '../../functions/socket.js'
import { useSelector } from 'react-redux'

const Lobby = () => {

  const [gameData, setGameData] = useState({})
  const [amHost, setAmHost] = useState(false)
  
  const user = useSelector(state => state.user)
  const { gameId } = useParams()

  // figure out if user is host by matching host.userId to user.userId
  const figureIfHost = () => {
    if (user) {
      const host = gameData.players ? gameData.players.filter(player => player.host)[0] : null
      if (host) {
        if (user.userId === host.userId) {
          setAmHost(true)
          return
        }
      }
    }
    setAmHost(false)
  }

  console.log("amHost: ", amHost)

  const startGame = () => {
    socket.emit('start game', gameData)
  }

  useEffect(() => {
    socket.emit('get room', { gameId })

    socket.on('room data', (res) => {
      // console.log('lobby room data',res.data)
      setGameData(res.data)
    })

    socket.on('new player', (res) => {
      // console.log('new player joined', res.message, res.data.players)
      // console.log('GAME DATA', gameData)
      // console.log('RESPONSE GAME DATA', res.data.foundGame)
      setGameData(res.data.foundGame)
    })

    socket.on('game initialize', (res) => {
      console.log('game initialized hit', res)
    })

  }, [])

  useEffect(() => {
    figureIfHost()
  }, [gameData])

  const allPlayers = gameData.players ? gameData.players.map((el, i) => {
    return <section key={i}>
      <p>Player Id: {el.playerId}</p>
      <p>Player Name: {el.user.username}</p>
    </section>
    })
    :
    []

  return (
    <div>Lobby

      <section id='host-start-section'>
        {amHost && (
          <button 
            id='host-start-btn'
            onClick={startGame}
            >
              Start Game
          </button>
        )}
      </section>

      <section>
        {allPlayers}
      </section>
    </div>
  )
}

export default Lobby