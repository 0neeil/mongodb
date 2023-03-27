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
}

module.exports = new adminMenu()