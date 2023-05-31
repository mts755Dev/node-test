import express from 'express';
import { createUser, deleteUser, getUser, getUsers, patchUser } from '../../controllers/users.js';
import { validate } from '../../middleware/validation.js';
import { UserSchema } from '../../schemaValidator/userSchema.js';

const userRouter = express.Router();

userRouter
  .route('/')
  .get(getUsers)
  .post(validate({ body: () => UserSchema('POST') }), createUser);

userRouter
  .route('/:id')
  .get(getUser)
  .patch(validate({ body: () => UserSchema('PATCH') }), patchUser)
  .delete(deleteUser);

export default userRouter;
