const Router = require('express')
const controller = require('../controller/authController')
const {check} = require('express-validator')
const admin = require("../admin_menu/admin")


const router = new Router()

router.post('/registration',[
    check('username', "This field cannot be empty").notEmpty(),
    check('username', "The username cannot be shorter than 4 or more than 12 characters").isLength({min: 4, max: 12}),
    check('password', "This field cannot be empty").notEmpty(),
    check('password', "The password cannot be shorter than 4 or more than 24 characters").isLength({min: 4, max: 24}) 
    ], controller.registration)
router.post('/login', controller.login)
router.get('/users', controller.getUsers)
router.post('/delete', admin.deleteUser)

module.exports = router