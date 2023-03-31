const User = require('../models/User')
const Products = require('../models/Products')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('../config')
const { get } = require('mongoose')
const { countDocuments } = require('../models/Products')

class productsController {

    async getProducts (req, res){
        try {
            const getProduct = await Products.find()
            res.json(getProduct)
        } catch (error) {
            console.log(error)
        }
    }

    async addProducts (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({message: "Added error"})
            }

            const {code, productname, available, cost} = req.body
            const newProduct = await Products.findOne({code})

            if(newProduct){
                return res.status(400).json({message: "Product with this code already exists"})
            }

            const product = new Products({code, productname, available, cost})
            await product.save()

            return res.json({message: "Product added"})
        } catch (error) {
            console.log(error)
        }
        
    } 
    
    async deleteProducts (req, res) {
        try {
            const {code} = req.body
            const product = await Products.findOne({code})
            if (!product){
                return res.status(400).json({message: "Product with this code not found"})
            }
            await Products.deleteOne({code: code})
            res.json({message: "Product deleted"})
        } catch (error) {
            console.log(error)
        }
    }
 

    async buyProducts (req, res) {

    }

}

module.exports = new productsController()