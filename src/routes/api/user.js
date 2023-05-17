import express from 'express'
import UserModel from '../../models/User.js'

const userRouter = express.Router()

userRouter.get('/', async (req, res) => {
  try {
    let users = await UserModel.find()
    return res.status(200).json(users)
  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server Error: ' + error.message)
  }
})

userRouter.get('/:id', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id)
    if (user) {
      return res.status(200).json(user)
    }
    return res.status(404).json({ message: 'User not found.' })
  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server Error: ' + error.message)
  }
})

userRouter.post('/', async (req, res) => {
  try {
    if (req.body.email && req.body.name) {
      const { name, email } = req.body
      let user = await UserModel.findOne({ email })
      if (user) {
        return res.status(400).json({ errors: [{ message: 'User already exists' }] })
      }
      user = await create({ name, email })
      return res.status(200).json(user)
    }
    res.status(400).json({ message: "Invalid user data" })
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error: ' + error.message);
  }
});

userRouter.patch('/:id', async (req, res) => {
  const { name, email } = req.body
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id
      ,
      {
        name,
        email
      },
      { new: true },)
    if (user) {
      return res.status(200).json(user)
    }
    return res.status(404).json({ message: 'User not found.' })
  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server Error: ' + error.message)
  }
})

userRouter.delete('/:id', async (req, res) => {
  try {
    const user = await UserModel.findByIdAndRemove(req.params.id);
    return res.status(404).json(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server Error: ' + error.message)
  }
})

export default userRouter
