import mongoose from 'mongoose'
import { Schema, model } from 'mongoose'

const BookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    },
  },
  { timestamps: true }
)

const BookModel = model('Books', BookSchema)
export default BookModel
