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
}

module.exports = new adminMenu()