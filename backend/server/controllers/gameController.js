import { User, Game, Player } from '../../database/model.js'
import { Op } from 'sequelize'

const gameFunctions = {
    newGame: async (req, res) => {
        const { name, locked, password, active, playerLimit, startingDice } = req.body

        // Checks to see if game name already exists
        const gameCheck = await Game.findOne({
            where: {
                name: name
            }
        })

        if (gameCheck) {
            res.send('name already in use')
            return
        }

        // Creates new game
        const game = await Game.create({
            name, password, locked, active, playerLimit, startingDice
        })

        console.log(game)

        // Creates player and assigns game creater as host
        if (game) {
            const player = await game.createPlayer({
                host: true,
                userId: req.session.userId
            })

            console.log(player)

            res.send({ game, message: 'it worked' })
            return
        }

        res.send('game creation failed')

    },

    allGames: async (req, res) => {
        // Finds all active games
        const gameList = await Game.findAll({
            where: {
                [Op.and]: [
                    { active: true }
                ]
            },
            include: {
                model: Player
            }
        })

        console.log(gameList)

        // Filters out full games
        const filteredGames = gameList.filter((game => game.players.length < game.playerLimit))

        res.send(filteredGames)
    },

    joinGame: async (req, res) => {
        const { name, password } = req.body

        // Finds game with matching name
        const findGame = await Game.findOne(
            {
                where: {
                    name: name
                },
                include: {
                    model: Player
                }
            }
        )

        // Checks if the passwords match
        if (findGame) {
            if (findGame.password === password) {

                // If user is logged in, create player and assign to game
                if (req.session.userId) {
                    const player = await findGame.createPlayer({
                        host: false,
                        userId: req.session.userId
                    })

                    console.log(player)
                    res.send({ message: 'game joined', player })
                    return
                } else {
                    // Create temp user with unique username tied to game
                    const tempUser = await User.create({
                        username: `${findGame.name} G${findGame.players.length + 1}`,
                        password: 'guest',
                        imgUrl: 'guest.jpg'
                    })

                    const player = await findGame.createPlayer({
                        host: false,
                        userId: tempUser.userId,

                    })

                    console.log(player)
                    res.send({ message: 'guest game joined', player })
                    return
                }
            }

        }

        res.send('game not found')

    },

    startGame: async (req, res) => {
        res.send('it worked')
    },
}

export default gameFunctions