const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./router/authRouter')
const config = require("./config")


const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use('/auth', authRouter)

async function start() {
    try {
        await mongoose.connect(config.URL)

        app.listen(PORT, () => {
            console.log(`server start ${PORT}`)
        })

    } catch (error) {
        console.log(error)
    }
}

start()