const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/User')

module.exports = async function(req, res, next){
    try {
        const {username} = req.body
        const user = await User.findOne({username})
        if(!user.ban){
            next()
        }
        else
            return res.status(400).json({message: `User with this ${username} has banned`})
    } catch (error) {
        console.log(error)
    }    
}
