const express = require('express')
const {getUsers, signup, login} = require('../controllers/userController')
const router = express.Router()

router.get("/users", getUsers)
router.post("/signup", signup)
router.post("/login", login)

module.exports = router