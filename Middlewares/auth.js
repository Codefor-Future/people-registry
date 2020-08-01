const jwt = require('jsonwebtoken');
const Shop= require('../Model/Shop')

const shopAuth =async(req,res,next)=>{
    if(req.cookies.shopToken){
        const decoded= jwt.verify(req.cookies.shopToken, "secret")
        const shop = await Shop.findById(decoded);

        if(shop){
            req.shopAuth={
                id:shop.id
            }
            next();
        }else{
            req.shopAuth=false;
            next();
        }
    }else{
        req.shopAuth= false;
        next();
    }
}

module.exports = shopAuth