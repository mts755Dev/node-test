import UserModel from "../models/User.js"

export const userAuth = async (req, res, next) => {

  const { email, password } = req.body
  try {
    const user = await UserModel.findOne({ email }).select('+password')
    if (!user) {
      return res.status(404).json({ errors: [{ message: 'User does not exists' }] })
    }
    req.isPasswordValid = await user.isValidPassword(password)
    next()

  } catch (error) {
    console.error(error.message);
    return res.status(500).json('Server Error: ' + error.message);
  }
}
