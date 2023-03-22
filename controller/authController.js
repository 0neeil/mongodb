const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')

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
            
        } catch (error) {
           console.log(error)
           res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res){
        try {
            res.json("work")
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new authController()