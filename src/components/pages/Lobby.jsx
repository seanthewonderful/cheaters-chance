import { useEffect, useState } from 'react'
import Player from '../Player'
import Opponent from '../Opponent'
import Dice from '../Dice'
import { useNavigate, useParams } from 'react-router-dom'

import socket from '../../functions/socket.js'
import { useDispatch, useSelector } from 'react-redux'

const Lobby = () => {

  const [gameData, setGameData] = useState({})
  const [amHost, setAmHost] = useState(false)

  const user = useSelector(state => state.user)
  const { gameId } = useParams()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // figure out if user is host by matching host.userId to user.userId
  const figureIfHost = () => {
    console.log('user', user)
    console.log('gameData', gameData)
    if (user) {
      if (user.userId === gameData.hostId) {
        setAmHost(true)
        return
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
      setGameData(res.data)
    })

    socket.on('new player', (res) => {
      setGameData(res.data.foundGame)
    })

    socket.on('game initialized', (res) => {
      console.log('game initialized hit', res)
      dispatch({
        type: 'SET_GAME',
        payload: res
      })
      navigate(`/scuttlebutt/game`)
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