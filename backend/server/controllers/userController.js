import { User } from '../../database/model.js'

const userFunctions = {
    register: async (req, res) => {
        const { username, password, imgUrl } = req.body

        const userCheck = await User.findOne(
            {
                where: {
                    username: username
                }
            }
        )

        if(userCheck){
            let newUser = await User.create({
                username, password, imgUrl
            })

            res.status(200).send({ message: 'Registration successful', newUser })
            return
        }

        res.status(400).send({message: 'Username already exists'})

    },
    login: async (req, res) => {
        const { username, password } = req.body

        const foundUser = await User.scope('withPassword').findOne({
            where: {
                username: username
            }
        })

        if (foundUser) {
            if (foundUser.password === password) {
                req.session.userId = foundUser.userId
                req.session.username = foundUser.username
                res.status(200).send({ message: 'Login successful' })
                return
            }
        }

        res.status(400).send({ message: 'Username or password incorrect' })

    },

    logout: async (req, res) => {
        console.log(req.session)
        req.session.destroy()
        console.log(req.session)
        res.status(200).send('Logout successful')
    },

    sessionCheck: async (req, res) => {
        if (req.session.userId) {
            res.status(200).send({ message: 'Session check success', userId: req.session.userId })
        } else {
            res.status(400).send("No user logged in")
        }
    },
}

export default userFunctions