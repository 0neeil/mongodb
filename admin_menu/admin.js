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
                await User.updateOne({username: banUser.username}, {$set: {ban: true}})
                res.json('User banned')
            }else
                res.json({message: `user ${username} don't find`})
        } catch (error) {
            console.log (error)
        }
    }
}

module.exports = new adminMenu()