import { Schema, model } from 'mongoose'

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
  },
  { timestamps: true }
)

const UserModel = model('Users', UserSchema)
export default UserModel
