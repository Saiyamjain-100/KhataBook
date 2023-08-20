const moment = require('moment/moment');
const transactionModel = require('../models/transectionModel');

const getAllTransaction =async (req,res)=>{
      try {
            // console.log(req.body);
            const {frequency,selectedDate,type} = req.body
            const transection = await transactionModel.find({
                  ...(frequency!=='custom'?{
                        date:{
                              $gt: moment().subtract(Number(frequency),'d').toDate(),
                        },
                  }: {
                        date:{
                              $gte:selectedDate[0],
                              $lte:selectedDate[1],
                        },
                  }),
                  ...(type!=='all'&&{type}),
                  userid:req.body.userid
            });
            res.status(200).json(transection);
      } catch (error) {
            console.log(error);
            res.status(500).json(error);
      }
};

const addTransaction =async(req, res)=>{
      try {
            const newTransection = new transactionModel(req.body)
            await newTransection.save()
            res.status(201).send('Transaction Done')
      } catch (error) {
            console.log(error);
            res.status(500).json(error)
      }
};

const editTransaction =async(req, res)=>{
      try {
           await transactionModel.findOneAndUpdate({_id:req.body.transactionId},
            req.body.payload);
            res.status(200).send('Edit Successfully')
      } catch (error) {
            console.log(error);
            res.status(500).json(error)
      }
};


const deleteTransaction =async(req, res)=>{
      try {
           await transactionModel.findOneAndDelete({_id:req.body.transactionId}),
            res.status(200).send('Deleted Successfully')
      } catch (error) {
            console.log(error);
            res.status(500).json(error)
      }
};


module.exports = {getAllTransaction,addTransaction,editTransaction,deleteTransaction}