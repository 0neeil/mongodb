const Router = require('express')
const controller = require('../controller/authController')
const {check} = require('express-validator')
const admin = require("../admin_menu/admin")
const roleMiddleware = require("../middleware/authMiddleware")
const banChecker = require("../middleware/banChecker")

const router = new Router()

router.post('/registration',[
    check('username', "This field cannot be empty").notEmpty(),
    check('username', "The username cannot be shorter than 4 or more than 12 characters").isLength({min: 4, max: 12}),
    check('password', "This field cannot be empty").notEmpty(),
    check('password', "The password cannot be shorter than 4 or more than 24 characters").isLength({min: 4, max: 24}) 
    ], controller.registration)
router.post('/login', banChecker, controller.login)
router.get('/users',roleMiddleware(['Admin', 'Manager']) ,controller.getUsers)
router.post('/delete',roleMiddleware(['Admin', 'Manager']) ,admin.deleteUser)

module.exports = router