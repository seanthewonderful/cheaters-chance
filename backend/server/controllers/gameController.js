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
            res.status(200).send({ message: 'Name already in use' })
            return
        }

        // Creates new game
        const game = await Game.create({
            name, password, locked, active, playerLimit, startingDice
        })

        // Creates player and assigns game creater as host
        if (game) {
            await game.createPlayer({
                host: true,
                userId: req.session.userId
            })

            res.status(200).send({ message: 'Game created', game })
            return
        }

        res.status(400).send({ message: 'Game creation failed' })
    },

    allGames: async (req, res) => {
        // Finds all active games
        const gameList = await Game.findAll({
            where: {
                active: true
            },
            include: {
                model: Player
            }
        })

        if (gameList) {
            console.log(gameList)

            // Filters out full games
            const filteredGames = gameList.filter((game => game.players.length < game.playerLimit))

            res.status(200).send({ message: 'Active games found', filteredGames })
            return
        }

        res.status(400).send({ message: "There are no open games" })
    },

    joinGame: async (req, res) => {
        const { name, password } = req.body

        // Finds game with matching name
        const foundGame = await Game.findOne(
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
        if (foundGame) {
            if (foundGame.password === password) {

                // If user is logged in, create player and assign to game
                if (req.session.userId) {
                    const player = await foundGame.createPlayer({
                        host: false,
                        userId: req.session.userId
                    })

                    res.send({ message: 'Game joined', player })
                    return
                } else {

                    // Create temp user with unique username tied to game
                    const tempUser = await User.create({
                        username: `${foundGame.name} G${foundGame.players.length + 1}`,
                        password: 'guest',
                        imgUrl: 'guest.jpg'
                    })

                    const player = await foundGame.createPlayer({
                        host: false,
                        userId: tempUser.userId,
                    })

                    res.status(200).send({ message: 'Game joined as guest', player })
                    return
                }
            }
        }

        res.status(400).send({ message: 'Game not found' })
    },

    startGame: async (req, res) => {
        res.status(200).send({ message: 'Game started' })
    },
}

export default gameFunctions