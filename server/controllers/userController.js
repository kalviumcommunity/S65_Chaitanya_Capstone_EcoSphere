const users = require('../mockData')

const getUsers = (req, res) => {
    try {
        return res.status(200).json({userDetails: users})
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
}

module.exports = {getUsers}