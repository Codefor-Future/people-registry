const express = require('express');
const Shop = require('../Model/Shop');
const router= express.Router();
const shopAuth= require('../Middlewares/auth')
const path = require('path')

router.get('/',shopAuth,(req,res)=>{
    if(req.shopAuth){
        res.redirect(307,'/shop')
    }else{
        res.sendFile(path.join(__dirname,'../views/home.html'))
    }
})
module.exports = router