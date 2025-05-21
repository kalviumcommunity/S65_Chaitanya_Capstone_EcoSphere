const express = require('express')
const {getUsers, signup, login} = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()

router.get("/users", authMiddleware, getUsers)
router.post("/signup", signup)
router.post("/login", login)

module.exports = router