import {User, Game, Player, db} from './model.js'
import { Op } from 'sequelize';
import lodash from 'lodash'

const games = await Game.findAll(
    {
        where: {
            gameId: 4
        },
        include: {
            model: Player,
        }
    }
)

console.log(games[0].players)

db.close()