import { User, Game, Player, db } from './model.js'
import { Op } from 'sequelize';
import lodash from 'lodash'

console.log("Syncing database ...");

await db.sync({ force: true });

console.log("Seeding database ...");

const fellowship = [
    {
        username: 'misterBaggins',
        password: 'nineFingers',
        imgUrl: 'img.jpg'
    },
    {
        username: 'samwise',
        password: 'theBrave',
        imgUrl: 'img.jpg'
    },
    {
        username: 'meriadoc',
        password: 'saltedPork',
        imgUrl: 'img.jpg'
    },
    {
        username: 'thePipster',
        password: 'gemBoiii',
        imgUrl: 'img.jpg'
    },
    {
        username: 'grayGoose',
        password: 'pippinSux',
        imgUrl: 'img.jpg'
    },
]

let userAccounts = []

// create 5 user accounts
for (let i = 0; i < fellowship.length; i++) {

    // create 5 user accounts
    let newUser = await User.create(fellowship[i])
    userAccounts.push(newUser)

    // dynamically setup game params based on userId
    let password = newUser.userId % 2 === 0 ? null : 'speakFriendAndEnter'
    let locked = newUser.userId % 2 === 0 ? false : true
    let limit = newUser.userId % 2 === 0 ? 4 : 6
    let dice = newUser.userId % 2 === 0 ? 4 : 6

    let newGame = await Game.create(
        {
            name: `${newUser.username}'s Lobby`,
            locked: locked,
            password: password,
            active: true,
            playerLimit: limit,
            startingDice: dice
        }
    )

    // add host to new game
    await newGame.createPlayer({
        host: true,
        userId: newUser.userId
    })
}



// add each user to 2 random games
for (let i = 0; i < userAccounts.length; i++) {

    // get all games that haven't been created by the user
    let allGames = await Game.findAll({
        where: {
            active: true
        },
        include: [
            {
                model: Player,
                include: {
                    model: User,
                    where: {
                            userId: {[Op.ne]: userAccounts[i].userId}
                    }
                }
            },
        ]
    })

    // select two random games from filtered list
    const randomGames = lodash.shuffle(allGames).splice(0, 2)

    // add current user as player to games
    await randomGames[0].createPlayer(
        {
            host: false,
            userId: userAccounts[i].userId
        }
    )

    await randomGames[1].createPlayer(
        {
            host: false,
            userId: userAccounts[i].userId
        }
    )

}


db.close()