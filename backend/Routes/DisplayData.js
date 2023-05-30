const express=require("express");
const router = express.Router();

router.post("/foodData",function(req,res){
    try {
//          console.log(global.foodData);
         res.send([global.foodData,global.foodCategory]);
    } catch (error) {
        console.error(error.message);
        console.log("There is some error from DisplayData side");
    }
});
module.exports = router;
