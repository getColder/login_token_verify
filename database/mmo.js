const  DB = require("./base")

const mmo = new DB();

/** 
* @param {string} account 用户名
* @param {string} passwd 用户密码md5值
* @callback callback res返回结果：retrunCode, userName
        验证成功0 ,
        数据库查询错误1, 
        用户不存在2 ,
        密码错误3 ,
        @param {object} res
    @return void
**/
function verifyAccount(account, passwd, cb ){
    mmo.query(`
        SELECT
            account, IF(password = '${passwd}', 1, 0) AS isValid 
        FROM
            account
        WHERE
            account = '${account}' `, 
         (err, res, fileds) => {
            if(err)
                throw err;
            if(res.length <= 0){
                //用户不存在
                cb({
                    returnCode: 2,
                    username: ""
                })
            } 
            else{
                if(res[0].isValid == 1){
                    //验证通过
                    cb({
                        returnCode: 0,
                        username: account
                    });
                }
                else{
                    //密码错误
                    cb({
                        returnCode: 3,
                        username: account
                    });
                }
            }
    });
}


module.exports.verifyAccount = verifyAccount;





