const Router = require('express')
const controller = require('../controller/authController')
const {check} = require('express-validator')
const admin = require("../admin_menu/admin")
const roleMiddleware = require("../middleware/authMiddleware")
const banChecker = require("../middleware/banChecker")
const product = require("../controller/productsController")

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
router.post('/ban', roleMiddleware(['Admin', 'Manager']), admin.banUser)
router.post('/unban', roleMiddleware(['Admin', 'Manager']), admin.unbanUser)
router.post('/setrole', roleMiddleware(['Admin']), admin.setUserRole)

router.post('/addproduct', [
    check('code', "This field cannot be empty").notEmpty(),
    check('code', "The code cannot be shorter than 2 or more than 6 characters").isLength({min: 2, max: 6}),
    check('productname', "This field cannot be empty").notEmpty(),
    check('productname', "The productname cannot be shorter than 4 or more than 24 characters").isLength({min: 2, max: 24}),
], roleMiddleware(['Admin', 'Manager']), product.addProducts)
router.get('/getproducts', roleMiddleware(['Admin', 'Manager', 'User']), product.getProducts)
router.post('/deleteproduct', roleMiddleware(['Manager', 'Admin']), product.deleteProducts)

module.exports = router