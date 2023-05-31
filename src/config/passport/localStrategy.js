import passportLocal from 'passport-local'
import UserModel from '../../models/User.js'

const LocalStrategy = passportLocal.Strategy

export const localStrategyLogin = new LocalStrategy(
  {
    usernameField: 'email'
  },
  async (email, password, done) => {
    // verify function as per documentation
    const user = await UserModel.findOne({ email }).select('+password')
    if (!user) {
      return done(null, false, { message: 'User not found' })
    }
    try {
      const isPasswordValid = await user.isValidPassword(password)
      console.log('first', isPasswordValid)
      if (!isPasswordValid) {

        return done({ message: "password didn't match" }, false)
      } else {
        console.log('login sucessfull')
        return done(null, { id: user.id, name: user.name, email: user.email }, { message: 'logged in successfully' })
      }
    } catch (error) {
      done(error)
    }
  }
)
