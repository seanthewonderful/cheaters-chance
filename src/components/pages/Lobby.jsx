import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import socket from '../../functions/socket.js'
import Game from './Game.jsx'

const Lobby = () => {

  const user = useSelector(state => state.user)
  const initialGameData = useSelector(state => state.game)

  const [gameData, setGameData] = useState(initialGameData)
  const [amHost, setAmHost] = useState(false)
  const [inGame, setInGame] = useState(false)

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
    // socket.emit('get room', { gameId })

    // socket.on('room data', (res) => {
    //   setGameData(res.data)
    // })

    socket.on('new player', (res) => {
      setGameData(res.data.foundGame)
      dispatch({
        type: 'SET_GAME',
        payload: res.data.foundGame
      })
    })

    socket.on('game initialized', (res) => {
      console.log('game initialized hit', res)
      dispatch({
        type: 'SET_GAME',
        payload: res
      })
      // navigate(`/game`)
      setInGame(true)
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