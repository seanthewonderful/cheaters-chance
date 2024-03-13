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
app.post('/register', register)
app.post('/login', login)
app.get('/logout', logout)
app.get('/sessionCheck', sessionCheck)


// GAME ENDPOINTS
const {newGame, allGames, joinGame, startGame} = gameFunctions
app.post('/newGame', newGame)
app.get('/allGames', allGames)
app.post('/joinGame', joinGame)
app.get('/startGame', startGame)

ViteExpress.listen(app, 2319, () => console.log('Keep it secret, keep it safe on http://localhost:2319'))