const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('../config')
const { get } = require('mongoose')
const { findOne } = require('../models/User')

class adminMenu{
    async deleteUser(req, res){
        try {
            const {username} = req.body
            let delUser = await User.findOne({username})
            if(delUser != null){
                await User.deleteOne({username: delUser.username})
                res.json('user deleted')
            }else
                res.json({message: `user ${username} dont find`})
            
        } catch (error) {
            console.log (error)
        }

    }
}

module.exports = new adminMenu()