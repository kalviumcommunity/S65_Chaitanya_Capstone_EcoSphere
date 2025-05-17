const express = require('express')
const app = express()

app.get("/", (req, res) => {
    try {
        return res.status(200).json({message: "Backend is running..."})
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
})

const PORT = 4000

app.listen(PORT, () => {
    try {
        console.log(`Server is listening on http://localhost:${PORT}`)
    } catch (err) {
        console.error(err.message)
    }
})