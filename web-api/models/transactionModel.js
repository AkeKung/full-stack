const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  _uid:{type:mongoose.ObjectId, required: true},
  book: { type: String,required: true},
  title: { type: String,required: true},
  number: {  type: Number, required: true},
  created: {  type: Date,  required: true,  default: Date.now},
  updated: {   type: Date, required: true}
})

//.model(export-name, schema, collection-name)
module.exports = mongoose.model('Transaction', transactionSchema)
