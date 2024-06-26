import {
  User,
  Game,
  Player
} from '../../database/model.js'
import {
  Op
} from 'sequelize'


const gameFunctions = {

  newGame: async (body) => {

    let {
      name,
      locked,
      password,
      playerLimit,
      startingDice,
      userId
    } = body

    name = name.trim()

    // Checks to see if game name already exists
    if (await Game.findOne({
          where: {
            name: name,
            active: true
          }
        })
      ) {
      return {
        message: 'Name already in use'
      }
    }

    name = name.replace("'", "''")

    // Creates new game
    let game = await Game.create({
      name,
      password,
      locked,
      playerLimit,
      startingDice,
      hostId: userId
    })

    const user = await User.findByPk(userId)
    user.inGame = true
    await user.save()

    // Creates player and assigns game creater as host
    if (game) {
      await game.createPlayer({
        userId: userId,
        dice: startingDice,
        // turn: 0
      })

      game = await Game.findOne({
        where: {
          name: game.name,
          active: true
          // password: password
        },
        include: {
          model: Player,
          include: {
            model: User
          }
        }
      })

      return {
        message: 'Game created',
        game: game
      }
    }

    return {
      message: 'Game creation failed'
    }
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

      // Filters out full games
      const filteredGames = gameList.filter((game => game.players.length < game.playerLimit))

      res.status(200).send({
        message: 'Active games found',
        filteredGames
      })
      return
    }

    res.status(400).send({
      message: "There are no open games"
    })
  },

  joinGame: async (body) => {

    if (!body.userId) {
      return {
        status: 401,
        message: "You must be logged in"
      }
    }

    let foundGame = await Game.findOne({
      where: {
        gameId: body.gameId,
        active: true
      },
      include: {
        model: Player, 
        include: {
          model: User
        }
      }
    })

    // Check if user is already in game
    if (foundGame.players.filter(player => player.user.userId === body.userId).length > 0) {
      return {
        status: 403,
        message: 'User already in game'
      }
    }

    // Checks if the passwords match
    if (foundGame) {

      // if the provided password matches game's password AND provided password is NOT 'default'
      if (foundGame.password === body.password) {

        const user = await User.findByPk(body.userId)
        user.inGame = true
        await user.save()

        const player = await foundGame.createPlayer({
          userId: body.userId,
          dice: foundGame.startingDice,
          // turn: foundGame.players.length
        })

        foundGame = await Game.findOne({
          where: {
            gameId: body.gameId,
            active: true
          },
          include: {
            model: Player,
            include: {
              model: User
            }
          }
        })

        return {
          status: 200,
          message: 'Game joined',
          player,
          foundGame
        }

      } else {
        console.log('password does not match')

        return {
          status: 403,
          message: 'Password incorrect',
        }
      }
    }

    return {
      message: 'game not found'
    }
  },

  startGame: async (gameId) => {
    let game = await Game.findByPk(gameId)
    await game.update({ active: false })
    game = await Game.findByPk(gameId, {
      include: {
        model: Player,
        include: {
          model: User
        }
      }
    })
    return game
  },

  findGame: async (body) => {

    return await Game.findOne({
      where: {
        gameId: body.gameId
      },
      include: {
        model: Player,
        include: {
          model: User
        }
      }
    })
  },

  placeBet: async (body) => {

    let game = await Game.findByPk(body.gameId, {
      include: Player
    })

    let turn = game.turn >= game.players.length - 1 ? 0 : game.turn + 1

    await game.update({
      currentCount: +body.bet.count,
      currentValue: +body.bet.value,
      turn: turn
    })

    game = await Game.findByPk(body.gameId, {
      include: {
        model: Player,
        include: {
          model: User
        }
      }
    })

    return game
  },
  diceRoll: async (body) => {

  },

  getPlayerById: async (playerId) => {
    return await Player.findByPk(playerId, { include: User })
  },

  removePlayerFromGame: async (body) => {
    let game = await Game.findByPk(body.gameId)
    await game.removePlayer(body.playerId)

    game = await Game.findByPk(body.gameId, {
      include: {
        model: Player
      }
    })

    let turn = game.turn >= game.players.length - 1 ? 0 : game.turn

    await game.update({ turn: turn })

    game = await Game.findByPk(body.gameId, {
      include: {
        model: Player,
        include: {
          model: User
        }
      }
    })
    return game
  }
}

export default gameFunctions