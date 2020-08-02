const express = require('express');
const Shop = require('../Model/Shop');
const router= express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const shopAuth= require('../Middlewares/auth');


router.get('/',shopAuth,(req,res)=>{
    if(req.shopAuth){
        res.sendFile(path.join(__dirname,'../views/shop.dashboard.html'))
    }else{
        res.sendFile(path.join(__dirname,'../views/shop.register.html'))
    }
})
router.get('/details',shopAuth,async(req,res)=>{
    if(req.shopAuth){
        const shop= await Shop.findById(req.shopAuth.id);
        res.send(shop)
    }
})

router.post('/register',async(req,res)=>{
    const newShop= req.body;
    try{
        let shop = await Shop.findOne({
            mobile:newShop.newShop.shopMobile
        })
        
        if(shop){
            res.status(406).send("Mobile already registered !!")
        }
        else{
            shop = new Shop({
                name:newShop.newShop.shopName,
                mobile:newShop.newShop.shopMobile,
                password:newShop.newShop.shopPassword,
                location:newShop.newShop.shopLocation,
                visitors:[]
            })

            await shop.save();
            console.log("shop saved!!!")
            const payLoad = {
                id:shop.id
            }
            jwt.sign(payLoad,"Abhinav1190",(err,token)=>{
                res.cookie("shopToken",token).send("Saved")
            })
        }
    }
    catch (err){
        res.status(406).send("Please check the details !!")
    }
})

module.exports= router