const mongoose = require('mongoose')

const transectionSchema = new mongoose.Schema({
      userid:{
            type:String,
            required:[true,"id required"]
      },
      amount:{
            type:Number,
            required:[true,"Amount is required"]
      },
      type:{
            type:String,
            required:[true,"type is required"]
      },
      category:{
            type:String,
            required:[true,"Category is required"]
      },
      reference:{
            type:String
      },
      description:{
            type:String,
            required:[true,"Description is required"]
      },
      date:{
            type: Date,
            required:[true,"Description is required"]
      }
      
},{timestamps:true})

const transactionModel = mongoose.model("transecions",transectionSchema)

module.exports = transactionModel