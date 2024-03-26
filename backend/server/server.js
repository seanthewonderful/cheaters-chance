import express from 'express'
import session from 'express-session'
import ViteExpress from 'vite-express'
import userFunctions from './controllers/userController.js'
import gameFunctions from './controllers/gameController.js'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import axios from 'axios'

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


io.on('connection', async (socket) => {
    console.log('socket connected')

    socket.on('greet', () => {
        console.log('greet hit')

        socket.broadcast.emit('goodbye', {data: 'sup boiiii'})
    })

    socket.on('joinGame', async (obj) => {
        console.log('join game hit')
        console.log(obj)

        let asdf = await joinGame(obj)
        console.log(asdf)

        socket.emit('jg hit', {data: asdf})
    })

    socket.on('hostGame', async (body) => {
        console.log('host game hit')

        let hostGameData = await newGame(body)

        socket.emit('host game data', hostGameData)
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
const { newGame, allGames, joinGame, startGame } = gameFunctions
app.post('/api/newGame', newGame)
app.get('/api/allGames', allGames)
app.post('/api/joinGame', joinGame)
app.get('/api/startGame', startGame)

// ViteExpress.listen(app, 2319, () => console.log('Keep it secret, keep it safe on http://localhost:2319'))

httpServer.listen(2319, () => console.log('Keep it secret, keep it safe on http://localhost:2319'))

ViteExpress.bind(app, httpServer)