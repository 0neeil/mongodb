const User = require('../models/User')
const Role = require('../models/Role')

class authController {
    async registration(req, res){
        try {
            
        } catch (error) {
           console.log(error) 
        }
    }

    async login(req, res){
        try {
            
        } catch (error) {
           console.log(error) 
        }
    }

    async getUsers(req, res){
        try {
            const userRole = new Role()
            const adminRole = new Role({value: 'Admin'})
            
            await adminRole.save()
            await userRole.save()
            
            res.json("work")
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new authController()