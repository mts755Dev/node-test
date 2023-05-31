import passportJWT from 'passport-jwt'
import UserModel from '../../models/User.js'
import dotenv from 'dotenv'
dotenv.config()

const ExtractJwt = passportJWT.ExtractJwt
const JWTstrategy = passportJWT.Strategy

export default new JWTstrategy(
  {
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromHeader('x-auth-token'),
    passReqToCallback: true
  },
  async (req, token, done) => {
    try {
      const user = await UserModel.findById(token.id)
      if (user) {
        req.user = user
        return done(null, user)
      }
      return done(null, false, { message: 'Invalid user token' })
    } catch (err) {
      return done(err)
    }
  }
)
