import express from 'express';
import { createBook, getBook, getBooks, patchBook, deleteBook } from '../../controllers/books.js';

const bookRouter = express.Router()

bookRouter.
  route('/').
  get(getBooks).
  post(createBook)

bookRouter.
  route('/:id').
  get(getBook).
  patch(patchBook).
  delete(deleteBook)

export default bookRouter
