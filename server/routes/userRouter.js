
const express = require('express')
const {getUsers, addUser, updateUser} = require('../controllers/userController')
const router = express.Router()

router.get("/users", getUsers)
router.post("/users", addUser)
router.put("/users/:email", updateUser)

module.exports = router
