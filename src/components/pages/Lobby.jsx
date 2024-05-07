import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import socket from '../../functions/socket.js'
// import Game from './Game.jsx'

const Lobby = () => {

  const user = useSelector(state => state.user)
  const initialGameData = useSelector(state => state.game)

  const [gameData, setGameData] = useState(initialGameData)
  const [amHost, setAmHost] = useState(false)
  const [lobbyStatus, setLobbyStatus] = useState('initializing')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Figure out who user is in context of the game
  const self = gameData.players.filter(player => player.user.userId === user.userId)[0]

  // figure out if user is host by matching host.userId to user.userId
  const figureIfHost = () => {
    if (user && user.userId === gameData.hostId) {
      setAmHost(true)
    } else {
      setAmHost(false)
    }
  }

  const startGame = () => {
    setLobbyStatus('startingGame')
    socket.emit('start game', gameData)
  }

  useEffect(() => {

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
        payload: res.gameData
      })
      navigate(`/game`)
      // setInGame(true)
    })

    socket.on('player disconnected', (res) => {
      console.log("LOBBY ",res.message, res.playerName, res.gameData)
      dispatch({
        type: 'SET_GAME',
        payload: res.gameData
      })
      setGameData(res.gameData)
    })

  }, [])

  // Each time gameData changes, figure out if user is host
  useEffect(() => {
    figureIfHost()
  }, [gameData])

  // If user navigates away from page, emit player disconnect
  useEffect(() => {

    setLobbyStatus('waiting')

    console.log("LOBBY INITIAL RENDER")

    const handleUnload = () => {
      socket.emit('player disconnect', { 
        playerId: self.playerId,
        gameId: gameData.gameId
      });
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      if (lobbyStatus === 'waiting') {
        window.removeEventListener('beforeunload', handleUnload)
        console.log("LOBBY CLEANUP FUNCTION")
        handleUnload()
      }
    }
    
  }, [])

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