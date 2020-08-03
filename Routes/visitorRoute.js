const express= require('express')
const router= express.Router();
const shopAuth = require('../Middlewares/auth')
const Shop = require('../Model/Shop')
const jwt = require('jsonwebtoken')


router.post('/fromShop',shopAuth,async(req,res)=>{
    try{
        const visitor= {
            visitorName:req.body.name,
            visitorMobile:req.body.mobile,
            visitorLocation:req.body.location,
            visitorTime: new Date()
        }
        const shop = await Shop.findById(req.shopAuth.id)
        
        shop.visitors.push(visitor)
        shop.save((err)=>{
            if(!err){
                res.send("Saved")
            }
        })
        console.log(shop)
    }
    catch(err){
        console.log(err)
    }
})
router.post('/:shopId',async(req,res)=>{

    try{
        const visitor= {
            visitorName:req.body.name,
            visitorMobile:req.body.mobile,
            visitorLocation:req.body.location,
            visitorTime: new Date()
        }
        const shopId= jwt.verify(req.params.shopId,"Abhinav1190")
        const shop = await Shop.findById(shopId.id)
        
        shop.visitors.push(visitor)
        shop.save((err)=>{
            if(!err){
                res.send("Visit Recorded")
            }else{
                res.status(403).send("Check you information")
            }
        })
    }
    catch(err){
        console.log(err)
    }
})


router.get('/:shopId',async(req,res)=>{
    const shopId = jwt.verify(req.params.shopId,"Abhinav1190")
    const shop = await Shop.findById(shopId.id);
    if(shop){
        res.render('visitor.ejs',{data:{shopName:shop.name,shopId:req.params.shopId}})
    }
    else{
        res.status(403).send()
    }
})


module.exports= router