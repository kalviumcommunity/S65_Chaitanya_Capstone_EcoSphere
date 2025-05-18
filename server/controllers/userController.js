const users = require('../mockData')

const getUsers = (req, res) => {
    try {
        return res.status(200).json({userDetails: users})
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

const addUser = (req, res) => {
    try {
        const {username, email, password} = req.body
        const newUser = {
            username,
            email,
            password
        }
        users.push(newUser)
        return res.status(201).json({message: "User Created Successfully..."})
        
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

module.exports = {getUsers, addUser}