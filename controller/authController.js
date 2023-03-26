const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('../config')
const { get } = require('mongoose')


const generateAccessToken = (id, username, roles) =>{
    const payload = {
        id, 
        username, 
        roles
    }
    return jwt.sign(payload, config.SECRETKEY, {expiresIn:"30m"})
}

class authController {
    async registration(req, res){
        try {
            const errors = validationResult(req)
            
            if(!errors.isEmpty()){
                return res.status(400).json({message:"Registration error", errors})
            }

            const {username, password} = req.body
            const newUser = await User.findOne({username}) 
            
            if (newUser){
                return res.status(400).json({message: 'A user with this nickname already exists'})
            }
            
            let hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: "User"})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            
            await user.save()
            
            return res.json({message: 'User is now registered'})
        } catch (error) {
           console.log(error)
           res.status(400).json({message: 'Registation error'})
        }
    }

    async login(req, res){
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user){
                return res.status(400).json({message: `User ${username} not found`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword){
                return res.status(400).json({message: 'Incorrect password'})
            }
            const token = generateAccessToken(user._id, user.username, user.roles)
            return res.json({token})

        } catch (error) {
           console.log(error)
           res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res){
        try {
            const getUser = await User.find()
            res.json(getUser)
        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = new authController()