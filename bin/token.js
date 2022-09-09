const jwt = require('jsonwebtoken');
const JsonFile = require("jsonfile")

const localToken = JsonFile.readFileSync(__dirname + "/../config/tokensecret");

//新token
function tokenGen(info) {
    return jwt.sign(info, localToken.secret, {
        expiresIn: localToken.expir
    });
}

//验证token
function tokenVerify(token) {
    //验证是否存在于redis黑名单

    // -------------
    try {
        let data = jwt.verify(token, localToken.secret);
        return {
            isValid: true,
            user: data.user,
            exp: data.exp
        };
    } catch (e) {
        return {
            //验证失败或token过期
            isValid: false,
        }
    }
}

//有效期内刷新token
function tokenRefresh(token) {
    try {
        let data = jwt.verify(token, localToken.secret);
        let info = {
            user: data.user,
        };
        return jwt.sign(info, localToken.secret, {
            expiresIn: localToken.expir
        });
    } catch (e) {
        return null;
    }
}

//立即失效
function tokenClear(token) {
    try {
        let data = jwt.verify(token, localToken.secret);
        if(data.isValid){
            //验证通过，失效 -  redis 添加token到黑名单
        }
    } catch (e) {
        return null;
    }
}

//exports.localToken = localToken;
exports.tokenGen = tokenGen;
exports.tokenVerify = tokenVerify;
exports.tokenRefresh = tokenRefresh;
exports.tokenClear = tokenClear;

