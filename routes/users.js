var express = require('express');
var router = express.Router();
const mmoDB = require("../database/mmo")
const token = require("../bin/token")


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/member_login_t', function (req, respond, next) {
  const userInfo = req.body.account;
  const passwd = req.body.passwd;   //客户端密码的md5结果
  mmoDB.verifyAccount(userInfo, passwd, (res) => {
    console.log(res);
    if (res.returnCode === 0) {
      //验证通过
      const tokenInfo = {
        user: res.username
      }
      let t = token.tokenGen(tokenInfo);
      console.log(t);
      t = token.tokenRefresh(t);
      respond.setHeader("Authorization", `bearer ${t}`);
      respond.send('respond with a resource');
    }
  })
});

module.exports = router;
