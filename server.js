const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

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
  console.log(`Listening on port: ${PORT}`)
})
