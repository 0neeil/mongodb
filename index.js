const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./router/authRouter')



const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use('/auth', authRouter)

async function start() {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.nvu0195.mongodb.net/?retryWrites=true&w=majority')

        app.listen(PORT, () => {
            console.log(`server start ${PORT}`)
        })

    } catch (error) {
        console.log(error)
    }
}

start()