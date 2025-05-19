const User = require('../models/userModel')

const getUsers = async (req, res) => {
    try {
        const users = await User.findOne()
        if (!users) {
            return res.status(400).json({message: "No users found!"})
        }
        return res.status(200).json({userDetails: users})
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

const addUser = async (req, res) => {
    try {
        const {username, email, password} = req.body

        if (!username || !email || !password) {
            return res.status(400).json({message: "All fields are required!"})
        }
        const newUser = new User({
            username,
            email,
            password
        })

        await newUser.save()
        return res.status(201).json({message: "User Created Successfully...", userDetails: newUser})
        
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

const updateUser = async (req, res) => {
    try {
        const {_id} = req.params

        const existingUser = await User.findOne({_id})

        if (!existingUser) {
            return res.status(400).json({message: "Not a valid user!"})
        }
        
        const updatedUser = await User.findByIdAndUpdate(_id, req.body, {new: true})
        return res.status(200).json({message: "User Updation Successfull...", userDetails: updatedUser})

    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

module.exports = {getUsers, addUser, updateUser}