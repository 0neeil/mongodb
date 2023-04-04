const User = require('../models/User')
const Products = require('../models/Products')
const Purchase = require('../models/Purchase')
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
 
    async updateProduct (req, res) {
        try {
            const errors = validationResult(req)
            
            if(!errors.isEmpty()){
                return res.status(400).json({message:"Update error", errors})
            }
            const newProduct = req.body
            const code = newProduct.code
            const product = await Products.findOne({code})
            if(!product){
                return res.status(400).json({message: "Product with this code not found"})
            }
            await Products.updateOne({code: newProduct.code}, {$set: {
                code: newProduct.code || product.productname, 
                productname: newProduct.productname || product.productname, 
                available: newProduct.available || product.available, 
                cost: newProduct.cost|| product.cost}})
                res.json({message: 'Product uppdate'})
        } catch (error) {
            console.log(error)
        }
    }

    async buyProducts (req, res) {
        try {
            const {code, quantity} = req.body
            const product = await Products.findOne({code})
            if (!product){
                return res.status(400).json({message: `Product with ${code} not found`})
            }
            if(quantity > product.available){
                return res.status(400).json({message: `How many products are out of stock`})
            }

            let now = new Date()
            const token = req.headers.authorization.split(' ')[1]

            const {username: username} = jwt.verify(token, config.SECRETKEY)
            const purchase = new Purchase({code: code, productname: product.productname, quantity, cost: product.cost * quantity , username, date: now})
            
            await purchase.save()

            await Products.updateOne({code: code}, {$set: {
                available: product.available - quantity, 
            }})
            res.json({message: 'Buy success'})
            
        } catch (error) {
           console.log(error)
           res.status(400).json({message: 'Login error'})
        }

    }

}

module.exports = new productsController()