const express = require('express')
const dotenv = require('dotenv')
const userRoute = require('./routes/userRouter')
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser')
const uploadRoute = require('./routes/upload')

const app = express()
dotenv.config()
app.use(express.json())
app.use(cookieParser())

app.use("/api", userRoute)
app.use("/v1", uploadRoute)

app.get("/", (req, res) => {
    try {
        return res.status(200).json({message: "Backend is running..."})
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
})

const PORT = process.env.PORT || 4000

app.listen(PORT, async () => {
    try {
        await connectDB()
        console.log(`Server is listening on http://localhost:${PORT}`)
    } catch (err) {
        console.error(err.message)
    }
})