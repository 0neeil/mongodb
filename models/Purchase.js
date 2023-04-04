const {Schema, model} = require('mongoose')

const Purchase = new Schema({
    code: {type: String, require: true},
    productname: {type: String, require: true},
    quantity: {type: Number, require: true},
    cost: {type: Number, require: true},
    username: {type: String, require: true},
    date: {type: Date, require: true},
})

module.exports = model('Purchase', Purchase)