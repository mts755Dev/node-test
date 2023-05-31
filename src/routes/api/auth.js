import express from 'express'
import passport from 'passport'

import { loginUser, signUp } from '../../controllers/auth.js'

const authRouter = express.Router()

authRouter
  .route('/signup')
  .post(signUp)

authRouter
  .route('/login')
  .post(passport.authenticate('login', { session: false, failWithError: true }), loginUser)

export default authRouter
