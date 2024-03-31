import express from 'express'
import session from 'express-session'
import ViteExpress from 'vite-express'
import userFunctions from './controllers/userController.js'
import gameFunctions from './controllers/gameController.js'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors())

const sessionMiddleware = session({
    secret: 'theOneRing',
    saveUninitialized: false,
    resave: false
})

app.use(session({
    secret: 'theOneRing',
    saveUninitialized: false,
    resave: false
}))

app.use(sessionMiddleware)

app.use(express.static('src'))

const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:2319',
        credentials: true
    }
})

io.engine.use(sessionMiddleware)

ViteExpress.config({ printViteDevServerHost: true })


const rooms = {}

io.on('connection', async (socket) => {
    console.log('socket connected')

    socket.on('greet', () => {
        console.log('greet hit')

        socket.broadcast.emit('goodbye', {data: 'sup boiiii'})
    })

    socket.on('joinGame', async (body) => {
        console.log('join game hit')
        console.log(body)

        let joinedData = await joinGame(body)
        console.log(joinedData)

        
        socket.join(joinedData.foundGame.name)

        socket.emit('join game hit', {data: joinedData})

        io.to(joinedData.foundGame.name).emit('new player', {data: joinedData, message: 'new player joined'})
    })

    socket.on('hostGame', async (body) => {
        console.log('host game hit')

        if(rooms[body.name]){
            console.log('room exists')
        }
        let hostGameData = await newGame(body)

        console.log('host game data', hostGameData)

        if(hostGameData.game){
            rooms[hostGameData.game.name] = hostGameData.game.password

            socket.join(hostGameData.game.name)

            socket.emit('host game data', hostGameData)
        } else {
            socket.emit('gameFailure', {message: hostGameData.message})
        }
    })

    socket.on('start game', async (body) => {
      console.log('start game hit')
      console.log(body)
      io.to(body.name).emit('game initialized', body)
    })

    socket.on('get room', async (body) => {
        const foundGame = await findGame(body)

        socket.emit('room data', {data: foundGame})
    })


})

io.engine.on('connection_error', (err) => {
    console.log(err)
})

// ACCOUNT ENDPOINTS
const { register, login, logout, sessionCheck } = userFunctions
app.post('/api/register', register)
app.post('/api/login', login)
app.get('/api/logout', logout)
app.get('/api/sessionCheck', sessionCheck)


// GAME ENDPOINTS
const { newGame, allGames, joinGame, startGame, findGame } = gameFunctions
app.post('/api/newGame', newGame)
app.get('/api/allGames', allGames)
app.post('/api/joinGame', joinGame)
app.get('/api/startGame', startGame)

// ViteExpress.listen(app, 2319, () => console.log('Keep it secret, keep it safe on http://localhost:2319'))

httpServer.listen(2319, () => console.log('Keep it secret, keep it safe on http://localhost:2319'))

ViteExpress.bind(app, httpServer)