import express, { json } from "express"
import cors from "cors"
import morgan from "morgan"
import userRouter from "./src/routes/api/user.js"
import connectDB from "./src/config/db.js"
import dotenv from "dotenv"
import bookRouter from "./src/routes/api/book.js"
dotenv.config()
connectDB()

const app = express()

app.use(json({ extended: false }))
app.use(cors("*"))
app.use(morgan('tiny'))
app.get('/', (req, res) => {
  res.send("API is running")
})

app.use('/api/users', userRouter)
app.use('/api/books', bookRouter)

const PORT = process.env.PORT || 8564

app.listen(PORT, (req, res) => {
  console.log(`Listening on port: ${PORT}`)
})
