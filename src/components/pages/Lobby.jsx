import {useEffect, useState} from 'react'
import Player from '../Player'
import Opponent from '../Opponent'
import Dice from '../Dice'
import { useParams } from 'react-router-dom'

import socket from '../../functions/socket.js'

const Lobby = () => {
    // console.log('lobby socket', socket)

    const [gameData, setGameData] = useState({})

    const {gameId} = useParams()

    // console.log('gameId', gameId)

    useEffect(() => {
        socket.emit('get room', {gameId})

        socket.on('room data', (res) => {
            console.log('lobby room data',res.data)
            setGameData(res.data)
          })

          socket.on('new player', (res) => {
            console.log('new player joined', res.message, res.data)
            console.log('GAME DATA', gameData)
            console.log('RESPONSE GAME DATA', res.data.foundGame)
            setGameData(res.data.foundGame)
        })

    }, [])

    console.log(gameData.players)

    const allPlayers = gameData.players ? gameData.players.map((el) => <p>Player Id: {el.playerId}</p>) : []

  return (
    <div>Lobby

      <section>
        {allPlayers}
      </section>
    </div>
  )
}

export default Lobby