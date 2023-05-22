
import express from 'express'
import { createUser, deleteUser, getUser, getUsers, handleLogin, patchUser } from '../../controllers/users.js';
import { userAuth } from '../../middleware/userAuth.js';

const userRouter = express.Router()

userRouter
  .route('/')
  .get(getUsers)
  .post(createUser)

userRouter
  .route('/:id')
  .get(getUser)
  .patch(patchUser)
  .delete(deleteUser)

userRouter
  .route('/login')
  .post(userAuth, handleLogin)

export default userRouter
