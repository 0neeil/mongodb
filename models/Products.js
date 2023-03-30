const {Schema, model} = require('mongoose')

const Products = new Schema({
    code: {type: String, unique: true, require: true},
    productname: {type: String, require: true},
    available: {type: Number, require: true, default: 0},
    cost: {type: Number, require: true},
})

module.exports = model('Products', Products)