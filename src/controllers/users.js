import UserModel from "../models/User.js"
import jwt from "jsonwebtoken"

export const getUsers = async (req, res) => {
  try {
    let users = await UserModel.find()
    return res.status(200).json(users)
  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server Error: ' + error.message)
  }
}

export const getUser = async (req, res) => {
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
}

export const createUser = async (req, res) => {
  try {
    if (req.body.name && req.body.email && req.body.password) {

      const { name, email, password } = req.body

      let user = await UserModel.findOne({ email })
      if (user) {
        return res.status(422).json({ errors: [{ message: 'User already exists' }] })
      }
      user = await UserModel.create({ name, email, password })
      user = user.toObject()
      delete user.password
      return res.status(200).json(user)
    }
    res.status(403).json({ msg: "Invalid Data" })
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error: ' + error.message);
  }
}

export const patchUser = async (req, res) => {
  const { name, email } = req.body
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id
      ,
      {
        name,
        email
      },
      { new: true },
    )
    if (user) {
      return res.status(200).json(user)
    }
    return res.status(404).json({ message: 'User not found.' })
  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server Error: ' + error.message)
  }
}

export const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndRemove(req.params.id);
    return res.status(200).json(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server Error: ' + error.message)
  }
}

export const handleLogin = async (req, res) => {
  try {
    const token = jwt.sign(
      { email: req.body.email },
      process.env.SECRET_KEY,
      { expiresIn: '1d' },
    );
    return req.isPasswordValid ? res.status(200).json({ message: "logged in successfully", token: `Bearer ${token}` }) : res.status(404).json({ errors: [{ message: 'Invalid Credentials' }] })
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error: ' + error.message);
  }
}
