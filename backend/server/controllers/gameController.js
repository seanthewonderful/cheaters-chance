import { User, Game, Player } from '../../database/model.js'
import { Op } from 'sequelize'

const gameFunctions = {
    newGame: async (req, res) => {
        const { name, locked, password, active, playerLimit, startingDice } = req.body

        const gameCheck = await Game.findOne({
            where: {
                name: name
            }
        })

        if (gameCheck) {
            res.send('name already in use')
            return
        }

        const game = await Game.create({
            name, password, locked, active, playerLimit, startingDice
        })

        console.log(game)

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
        const filteredGames = gameList.filter((game => game.players.length < game.playerLimit))

        res.send(filteredGames)
    },

    joinGame: async (req, res) => {
        const { name, password } = req.body

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

        if (findGame) {
            if (findGame.password === password) {
                if (req.session.userId) {
                    const player = await findGame.createPlayer({
                        host: false,
                        userId: req.session.userId
                    })

                    console.log(player)
                    res.send({ message: 'game joined', player })
                    return
                } else {
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