const User = require('../models/User')

class adminMenu{
    async deleteUser(req, res){
        try {
            const {username} = req.body
            let delUser = await User.findOne({username})
            if(delUser != null){
                await User.deleteOne({username: delUser.username})
                res.json('User deleted')
            }else
                res.json({message: `user ${username} don't find`})
            
        } catch (error) {
            console.log (error)
        }
    }

    async banUser(req, res){
        try {
            const {username} = req.body
            let banUser = await User.findOne({username})
            if(banUser != null){
                if(!banUser.ban){
                await User.updateOne({username: banUser.username}, {$set: {ban: true}})
                res.json({message: 'User banned'})
                }
                else
                    res.json({message: 'This user is already banned'})
            }else
                res.json({message: `User ${username} don't find`})
        } catch (error) {
            console.log (error)
        }
    }

    async unbanUser(req, res){
        try {
            const {username} = req.body
            let banUser = await User.findOne({username})
            if(banUser != null){
                if(banUser.ban){
                await User.updateOne({username: banUser.username}, {$set: {ban: false}})
                res.json({message: 'User unbanned'})
                }
                else
                    res.json({message: 'This user is not banned'})
            }else
                res.json({message: `User ${username} don't find`})
        } catch (error) {
            console.log (error)
        }
    }


    async setUserRole(req, res){
        try {
            const {username, role}= req.body 
            const user = await User.findOne({username})
            if(user != null){
                if(user.roles === role){
                    return res.status(400).json({message: "User already has this role"})
                }
                await User.updateOne({username: user.username}, {$set: {roles: role}})
                return res.json({message: "User role changed"})
            }
            return res.status(400).json({message: "User not found"})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new adminMenu()