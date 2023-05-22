import BookModel from "../models/Book.js"

export const createBook = async (req, res) => {
  try {
    if (req.body.name && req.body.author) {
      const { name, author } = req.body
      let book = await BookModel.findOne({ name })
      if (book) {
        return res.status(400).json({ errors: [{ message: 'Book already exists' }] })
      }
      book = await BookModel.create({ name, author })
      return res.status(200).json(book)
    }
    res.status(400).json({ message: "Invalid user data" })
  } catch (error) {
    res.status(500).json('Server Error: ' + error.message);
  }
}

export const getBooks = async (req, res) => {
  try {
    const books = await BookModel.find()
    return res.status(200).json(books)
  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server Error: ' + error.message)
  }
}

export const getBook = async (req, res) => {
  try {
    const book = await BookModel.findById(req.params.id).populate('author')
    if (book) {
      return res.status(200).json(book)
    }
    return res.status(404).json({ message: 'Book not found.' })
  } catch (error) {
    res.status(500).json('Server Error: ' + error.message)
  }
}

export const patchBook = async (req, res) => {
  const { name, author } = req.body
  try {
    const book = await BookModel.findByIdAndUpdate(req.params.id
      ,
      {
        name,
        author
      },
      { new: true },
    )
    if (book) {
      return res.status(200).json(book)
    }
    return res.status(404).json({ message: 'Book not found.' })
  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server Error: ' + error.message)
  }
}

export const deleteBook = async (req, res) => {
  try {
    const book = await BookModel.findByIdAndRemove(req.params.id);
    return res.status(200).json(book)
  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server Error: ' + error.message)
  }
}
