import {
  User
} from '../../database/model.js'

const userFunctions = {

  register: async (req, res) => {
    const {
      username,
      password,
      imgUrl
    } = req.body

    const userCheck = await User.findOne({
      where: {
        username: username
      }
    })

    if (!userCheck) {
      let newUser = await User.create({
        username,
        password,
        imgUrl
      })

      await newUser.reload()

      req.session.user = newUser

      res.status(200).send({
        message: 'Registration successful',
        newUser
      })
      return
    }

    res.status(400).send({
      message: 'Username already exists'
    })

  },

  login: async (req, res) => {
    const {
      username,
      password
    } = req.body

    const foundUser = await User.findOne({
      where: {
        username: username,
        password: password
      }
    })

    if (foundUser) {
      req.session.user = foundUser

      res.status(200).send({
        message: 'Login successful',
        user: foundUser
      })
      return
    }

    res.status(400).send({
      message: 'Username or password incorrect'
    })

  },

  logout: async (req, res) => {
    req.session.destroy()
    res.status(200).send({
      message: 'Logout successful'
    })
  },

  sessionCheck: async (req, res) => {

    if (req.session.user) {
      res.status(200).send({
        message: 'Session check success',
        user: req.session.user
      })
      return
    } else {
      res.status(204).send({ message: "No user logged in" })
    }
  },
}

export default userFunctions