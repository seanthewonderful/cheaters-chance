import {
  DataTypes,
  Model
} from 'sequelize'
import connectToDB from "./db.js";
import util from "util";

export const db = await connectToDB("postgresql:///cheaters_chance");

export class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

User.init({
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(500),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  imgUrl: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  inGame: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  modelName: "user",
  sequelize: db,
  defaultScope: {
    attributes: {
      exclude: ['password']
    }
  },
  scopes: {
    withPassword: {
      attributes: {
        include: ['password'],
      },
    },
  },
})

export class Game extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Game.init({
  gameId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  locked: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  playerLimit: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  startingDice: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  modelName: 'game',
  sequelize: db
})

export class Player extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Player.init({
  playerId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  dice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  modelName: 'player',
  sequelize: db
})

// Each game has one host - 
User.hasMany(Game, {
  foreignKey: "hostId"
})
Game.belongsTo(User, {
  foreignKey: "hostId"
})

// Each user can have many players (one player needed per game)
User.hasMany(Player, {
  foreignKey: 'userId'
})
Player.belongsTo(User, {
  foreignKey: 'userId'
})

// Each player (newly created for each game) belongs to a game
Game.hasMany(Player, {
  foreignKey: 'gameId'
})
Player.belongsTo(Game, {
  foreignKey: 'gameId'
})