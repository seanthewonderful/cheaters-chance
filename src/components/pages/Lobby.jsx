import { useEffect, useState } from 'react'
import Player from '../Player'
import Opponent from '../Opponent'
import Dice from '../Dice'
import { useNavigate, useParams } from 'react-router-dom'

import socket from '../../functions/socket.js'
import { useDispatch, useSelector } from 'react-redux'
import Game from './Game.jsx'

const Lobby = () => {

  const [gameData, setGameData] = useState({})
  const [amHost, setAmHost] = useState(false)
  const [inGame, setInGame] = useState(false)

  const user = useSelector(state => state.user)
  const { gameId } = useParams()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // figure out if user is host by matching host.userId to user.userId
  const figureIfHost = () => {
    if (user && user.userId === gameData.hostId) {
      setAmHost(true)
    } else {
      setAmHost(false)
    }
  }

  const startGame = () => {
    socket.emit('start game', gameData)
  }

  useEffect(() => {
    socket.emit('get room', { gameId })

    socket.on('room data', (res) => {
      console.log('res')
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
      // navigate(`/scuttlebutt/game`)
      setInGame(true)
    })
    
    return () => {
      console.log("CLEANUP FUNCTION")
      socket.emit('player disconnect', { playerId: self.playerId })
      // need to get user's playerId here now
    }

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

  return inGame ? (
      <Game />
    ) : (
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