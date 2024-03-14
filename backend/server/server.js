import express from 'express'
import session from 'express-session'
import ViteExpress from 'vite-express'
import userFunctions from './controllers/userController.js'
import gameFunctions from './controllers/gameController.js'

const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(session({
    secret: 'theOneRing',
    saveUninitialized: false,
    resave: false
}))

// ACCOUNT ENDPOINTS
const {register, login, logout, sessionCheck} = userFunctions
app.post('/api/register', register)
app.post('/api/login', login)
app.get('/api/logout', logout)
app.get('/api/sessionCheck', sessionCheck)


// GAME ENDPOINTS
const {newGame, allGames, joinGame, startGame} = gameFunctions
app.post('/api/newGame', newGame)
app.get('/api/allGames', allGames)
app.post('/api/joinGame', joinGame)
app.get('/api/startGame', startGame)

ViteExpress.listen(app, 2319, () => console.log('Keep it secret, keep it safe on http://localhost:2319'))