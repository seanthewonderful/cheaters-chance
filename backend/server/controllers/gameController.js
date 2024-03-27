import { User, Game, Player } from '../../database/model.js'
import { Op } from 'sequelize'


const gameFunctions = {
    newGame: async (body) => {
        let { name, locked, password, playerLimit, startingDice, userId } = body

        // Checks to see if game name already exists
        const gameCheck = await Game.findOne({
            where: {
                name: name,
                active: true
            }
        })

        if (gameCheck) {
            // res.status(400).send({ message: 'Name already in use' })
            return{ message: 'Name already in use' }
        }

        name = name.replace("'", "''")

        // Creates new game
        const game = await Game.create({
            name, password, locked, playerLimit, startingDice
        })

        // Creates player and assigns game creater as host
        if (game) {
            await game.createPlayer({
                host: true,
                userId: userId
            })

            // res.status(201).send({ message: 'Game created', game })
            return { message: 'Game created', game }
        }

        return { message: 'Game creation failed' }
        // res.status(400).send({ message: 'Game creation failed' })
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

    joinGame: async (obj) => {

        // Finds game with matching name
        console.log('game name', obj.name)

        const foundGame = await Game.findOne(
            {
                where: {
                    name: obj.name,
                    // password: password
                },
                include: {
                    model: Player
                }
            }
        )

        console.log('found Game', foundGame)


        // Checks if the passwords match
        if (foundGame) {
            console.log('game found!')
            console.log(foundGame.password)
            console.log(obj.password)


            if (foundGame.password === obj.password && obj.password !== 'guest') {
                console.log('password hit')

                // If user is logged in, create player and assign to game
                if (obj.userId) {
                    const player = await foundGame.createPlayer({
                        host: false,
                        userId: obj.userId
                    })

                    return { message: 'Game joined', player, foundGame }
                } else {
                    console.log('no userId hit')
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

                    return { message: 'Game joined as guest', player, foundGame }
                }
            } else {
                console.log('no userId no password hit')
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

                return { message: 'Game joined as guest', player, foundGame }
            }
        }
        return { message: 'game not found' }
    },

    startGame: async (req, res) => {
        res.status(200).send({ message: 'Game started' })
    },

    findGame: async (body) => {

        const game = await Game.findOne({
            where: {
                gameId: body.gameId
            },
            include: {
                model: Player
            }
        })

        return game
    }
}

export default gameFunctions