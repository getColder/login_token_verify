const express = require('express');
const redis = require('../database/redis');
const router = express.Router();

const jwt = require("../bin/token")

//检查redis-token黑名单
router.use((req, res,next)=>{
    let token = req.header("Authorization");
    if(!token)
        tokenFailed(req,res,next);
    token = token.replace(/^Bearer\s+/, '')
    redis.get(token).then(res => {
        if(res !== null)
            tokenFailed(req,res,next);
        next();     //token不在黑名单
    }).catch(err => {
        tokenFailed(req,res,next);
        console.error(err)
    });
});


//验证token
router.use((req,res,next)=>{
    let token = req.header("Authorization");
    if(!token)
        tokenFailed(req,res,next);
    token = token.replace(/^Bearer\s+/, '')
    let check = jwt.tokenVerify(token);
    if(!check.isValid){
        tokenFailed(req,res,next);
        return;
    }
    next();
})


router.get("/", (req,res,next) => {
    res.json({
        important : "重要信息!"
    })
})

//验证失败
function tokenFailed(req, res, next) {
    res.status(403).json({
        msg: "验证失败！"
    })
}



module.exports = router;