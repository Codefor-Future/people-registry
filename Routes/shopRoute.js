const express = require('express');
const Shop = require('../Model/Shop');
const router= express.Router();
const path = require('path')
const shopAuth= require('../Middlewares/auth')


router.get('/',shopAuth,(req,res)=>{
    if(req.shopAuth){
        res.sendFile(path.join(__dirname,'../views/shop.dashboard.html'))
    }else{
        res.sendFile(path.join(__dirname,'../views/shop.register.html'))
    }
})

module.exports= router