const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const mongoose = require("mongoose")
const dotenv = require("dotenv/config")

const app = express()

app.use(express.json({ extended: false }))
app.use(cors("*"))
app.use(morgan('tiny'))
app.get('/', (req, res) => {
  res.send("API is running")
})

app.use('/api/users', require('./routes/api/user'))

const PORT = process.env.PORT || 8564

app.listen(PORT, (req, res) => {
  mongoose.set('strictQuery', true);
  mongoose.connect(process.env.MONGODB_URL)
    .then(() => { console.log('Connected to database'); })
    .catch((err) => console.log(err));
  console.log(`Listening on port: ${PORT}`)
})
