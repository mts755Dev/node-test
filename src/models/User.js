import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

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
    password: {
      type: String,
      max: 255,
      select: false,
      required: true
    }
  },
  { timestamps: true }
)
UserSchema.pre('save', async function (next) {
  if (!this.isModified("password")) return next();

  const saltRound = 10
  const password = this.password

  const salt = await bcrypt.genSalt(saltRound)
  const hash = await bcrypt.hash(password, salt)

  this.password = hash
  next()
})

UserSchema.methods.isValidPassword = async function (password) {
  const user = this
  const isPasswordValid = await bcrypt.compare(password, user.password)
  console.log('instance method isValidPassword ran: ' + isPasswordValid)

  return isPasswordValid
}

const UserModel = model('Users', UserSchema)
export default UserModel
