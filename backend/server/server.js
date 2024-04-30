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

    socket.on('join game', async (body) => {

        let joinedData = await joinGame(body)

        socket.join(joinedData.foundGame.name)

        socket.emit('join game hit', {data: joinedData})

        io.to(joinedData.foundGame.name).emit('new player', {data: joinedData, message: 'new player joined'})
    })

    socket.on('host game', async (body) => {

        let hostGameData = await newGame(body)

        if(hostGameData.game){
          rooms[hostGameData.game.name] = body.password

          socket.join(hostGameData.game.name)

          socket.emit('host game data', hostGameData)
        } else {
          socket.emit('game failure', { message: hostGameData.message })
        }
    })

    socket.on('start game', async (body) => {
      const gameData = await startGame(body.gameId)
      io.to(gameData.name).emit('game initialized', gameData)
    })

    socket.on('get room', async (body) => {
      const foundGame = await findGame(body)

      socket.emit('room data', {data: foundGame})
    })

    socket.on('dice roll', async (body) => {
        console.log('body', body)
        const foundGame = await findGame(body)
        const foundUser = await findPlayer(body.playerId)

        // console.log('foundUser', foundUser)
        // console.log('dice', body.dice)

        foundUser.one = body.dice['1']
        foundUser.two = body.dice['2']
        foundUser.three = body.dice['3']
        foundUser.four = body.dice['4']
        foundUser.five = body.dice['5']
        foundUser.six = body.dice['6']
        foundGame.rollCount += 1

        // console.log('foundUser', foundUser)

        await foundUser.save()
        await foundGame.save()

        const newFoundGame = await findGame(body)

        // console.log('found game', newFoundGame)
        // console.log(foundUser)


        if(newFoundGame.rollCount === newFoundGame.players.length){
            io.emit('all roll data', {
                message: 'all rolls complete',
                data: newFoundGame
            })
        }

    })

    socket.on('place bet', async (body) => {
      const gameData = await placeBet(body)

      io.to(gameData.name).emit('bet placed', { gameData })
    })

    socket.on('player disconnect', async (body) => {
      console.log("PLAYER DISCONNECT -- ", body)
    })

})

io.engine.on('connection_error', (err) => {
    console.log(err)
})

// ACCOUNT ENDPOINTS
const { register, login, logout, findPlayer, sessionCheck } = userFunctions
app.post('/api/register', register)
app.post('/api/login', login)
app.get('/api/logout', logout)
app.get('/api/sessionCheck', sessionCheck)


// GAME ENDPOINTS
const { newGame, allGames, joinGame, startGame, findGame, placeBet } = gameFunctions
app.post('/api/newGame', newGame)
app.get('/api/allGames', allGames)
app.post('/api/joinGame', joinGame)
app.get('/api/startGame', startGame)

// ViteExpress.listen(app, 2319, () => console.log('Keep it secret, keep it safe on http://localhost:2319'))

httpServer.listen(2319, () => console.log('Keep it secret, keep it safe on http://localhost:2319'))

ViteExpress.bind(app, httpServer)