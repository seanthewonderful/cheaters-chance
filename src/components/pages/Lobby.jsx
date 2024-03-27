import {useEffect} from 'react'
import Player from '../Player'
import Opponent from '../Opponent'
import Dice from '../Dice'
import { useParams } from 'react-router-dom'

import socket from '../../functions/socket.js'

const Lobby = () => {
    console.log('lobby socket', socket)

    const {gameId} = useParams()

    console.log('gameId', gameId)

    useEffect(() => {
        socket.emit('get room', {gameId})

        socket.on('room data', (res) => {
            console.log('lobby room data',res.data)
        })

        socket.on('new player', (res) => {
            console.log('new player joined', res.message, res.data)
        })

    }, [])


  return (
    <div>Lobby</div>
  )
}

export default Lobby