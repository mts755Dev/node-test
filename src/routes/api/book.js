import express from 'express';
import { validate } from '../../middleware/validation.js';
import { BookSchema } from '../../schemaValidator/bookSchema.js';
import { createBook, getBook, getBooks, patchBook, deleteBook } from '../../controllers/books.js';

const bookRouter = express.Router()

bookRouter.
  route('/').
  get(getBooks).
  post(validate({ body: () => BookSchema('POST') }), createBook)

bookRouter.
  route('/:id').
  get(getBook).
  patch(validate({ body: () => BookSchema('PATCH') }), patchBook).
  delete(deleteBook)

export default bookRouter
