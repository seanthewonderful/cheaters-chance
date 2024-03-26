import io from 'socket.io-client'

const socket = io('http://localhost:2319')

export default socket