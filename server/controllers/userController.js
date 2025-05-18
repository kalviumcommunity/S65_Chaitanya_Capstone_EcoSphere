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

const updateUser = (req, res) => {
    try {
    const {email} = req.params
    const {username, password} = req.body
    const findIndex = users.findIndex((user) => user.email === email)
    if (findIndex != -1) {
        const updateUser = { username, email, password }
        users[findIndex] = updateUser
        return res.status(200).json({message: "User Updated Successfully..."})
    }
    return res.status(400).json({message: "User Not Found!"})
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

module.exports = {getUsers, addUser, updateUser}