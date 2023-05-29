const express=require("express")
// const router=express.Router
const router = require('express').Router(); 
const order=require("../model/Orders");

router.post("/orderData",async(req,res)=>{
    let data=req.body.order_data
    await data.splice(0,0,({OrderDate:req.body.order_date}))
    
    let eID=await order.findOne({"email":req.body.email})
    console.log("eamil found "+eID);
    if(eID===null){
        try {
            await order.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                res.json({success:true})
            })
        } catch (error) {
           console.log(error.message); 
           res.send("ServerError",error.message)
        }
    }
    else{
        try {
            await order.findOneAndUpdate({email:req.body.email},
                {$push:{order_data:data}}
                ).then(()=>{
                    res.json({success:true})
                })
        } catch (error) {
           res.send("ServerError",error.message)
            
        }
    }
})
router.post("/myOrderData",async(req,res)=>{
    try {
        let mydata= await order.findOne({"email":req.body.email})
        // res.json({orderData:mydata})
        res.json({orderData:mydata})
    } catch (error) {
        res.send("ServerError",error.message)
        
    }
   
}) 
module.exports = router;
 