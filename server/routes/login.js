
var express = require('express');
var router = express.Router();

var jwt=require('jsonwebtoken');

const connection = require('./js/conn');

/* 统一设置响应头解决跨域 */ 
router.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*') // 允许访问的域
	res.header('Access-Control-Allow-Headers', 'authorization') // 允许携带的头
	next() // 放行
})

router.post("/logincheck",(req,res)=>{
    let{username,password}=req.body;
    const secret='LOVEME';
    const sqlStr=`select * from account where username='${username}' and password='${password}'`;
    connection.query(sqlStr,(err,data)=>{
        if (err) throw err;
        if(data.length>0){
            let dataStr = JSON.stringify(data[0]);
            let  accountInfor = JSON.parse(dataStr);
            //console.log(accountInfor);
            const token = jwt.sign(accountInfor, secret, { expiresIn:60*30});
            //console.log(token);
            res.send({"error_code":0,"reason":"密码正确","username":accountInfor.username ,token},)
        }else{
            res.send({"error_code":1,"reason":"密码错误"})
        }
    })
});

module.exports = router;
