const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = function(role){
    return function (req, res, next){
        if(req.method === "OPRIONS"){
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                return res.status(400).json({message: "The user is not authorized"})
            }
            const {roles: userRole} = jwt.verify(token, config.SECRETKEY)
            let hasRole = false

            role.forEach(role => {
                if (role.includes(userRole)){
                    hasRole = true
                }
            });
            
            if(!hasRole){
                return res.status(400).json({message: "You don't have access to this function"})
            }
            next()
        } catch (error) {
            console.log(error)
            return res.status(400).json({message: "The user is not authorized"})
        }
    }
}