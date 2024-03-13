import { User } from '../../database/model.js'

const userFunctions = {
    register: async (req, res) => {
        const { username, password, imgUrl } = req.body

        let newUser = await User.create({
            username, password, imgUrl
        })
        res.send({ message: 'it worked', newUser })
    },
    login: async (req, res) => {
        const { username, password } = req.body

        const foundUser = await User.findOne({
            where: {
                username: username
            }
        })

        if (foundUser) {
            if (foundUser.password === password) {
                req.session.userId = foundUser.userId
                req.session.username = foundUser.username
                res.send({ message: 'login successful' })
                return
            }
        }

        res.send({ message: 'username or password incorrect' })

    },

    logout: async (req, res) => {
        console.log(req.session)
        req.session.destroy()
        console.log(req.session)
        res.send('Logout successful')
    },

    sessionCheck: async (req, res) => {
        if (req.session.userId) {
            res.send({ userId: req.session.userId })
        } else {
            res.send("No user logged in")
        }
    },
}

export default userFunctions