const express = require('express')
const router = express.Router()
const users = require("../users");

router.get('/', async (req, res) => {
  try {
    if (users.length > 0) {
      return res.status(200).json(users)
    }
    return res.status(404).json({ msg: 'Users not found' })
  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server Error: ' + error.message)
  }
})

router.get('/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const user = users.filter(user => user.id === req.params.id)
    if (user.length > 0) {
      return res.status(200).json(user)
    }
    return res.status(404).json({ msg: 'User not found' })
  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server Error: ' + error.message)
  }
})

router.post('/', async (req, res) => {
  const { id, name } = req.body;
  const newUser = { id, name }
  try {
    users.push(newUser)
    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server Error: ' + error.message)
  }
})

router.delete('/:id', async (req, res) => {
  const user = users.findIndex(user => user.id === req.params.id)
  try {
    if (user !== -1) {
      const deltedUser = users.splice(user, 1)[0]
      return res.status(200).json(deltedUser)
    }
    return res.status(404).json({ msg: 'User not found' })
  } catch (error) {
    console.error(error.message)
    res.status(500).json('Server Error: ' + error.message)
  }
})

module.exports = router
