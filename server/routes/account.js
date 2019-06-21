var express = require('express');
var router = express.Router();

// 引入模块 测试数据里是否连接成功...
const connection = require('./js/conn')

/* 统一设置响应头解决跨域 */ 
router.all('*', (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'authorization') // 允许携带的头
	
	next() // 放行
})

//添加账户
router.post("/accountAdd",(req,res)=>{
    //接收数据
  let{username,password,usergroup} = req.body;
  console.log(username,password,usergroup);

  //把数据存入数据库
    const sqlStr = `insert into Account(username,password,usergroup) 
    values('${username}','${password}','${usergroup}')`;

    connection.query(sqlStr,(err,data)=>{
        if (err) throw err;
        //如果大于0表示成功
        if (data.affectedRows>0){
            res.send({"error_code":0,"reason":"插入数据成功"});
        }else{
            //防护失败对象
            res.send({"error_code":1,"reason":"插入数据失败"});
        }
    });
    console.log(sqlStr);
});

//显示装好列表路由
// router.get("/accountList",(req,res)=>{
//     const sqlStr ="select * from Account order by ctime desc";
//     connection.query(sqlStr,(err,data)=>{
//         if(err)throw err;
//         res.send(data);
//     })
// });

//分页显示账号列表
router.get("/accountListpage",(req,res)=>{
    let{pageSize,currentPage} =req.query;
    pageSize =pageSize ?pageSize:3;
    currentPage =currentPage ?currentPage:1;
    let sqlStr = `select * from account order by ctime desc`;
    connection.query(sqlStr,(err,data)=>{
        if(err)throw err;
        let total = data.length;
        let n = (currentPage -1)*pageSize;
        sqlStr += ` limit ${n}, ${pageSize}`;
        console.log(sqlStr);
        connection.query(sqlStr,(err,data)=>{
            if(err)throw err;
            res.send({total,data})
        })
    })
});



//删除账号路由
router.get("/AccountDel",(req,res)=>{
    let {id} =req.query;
    const sqlStr =`delete from Account where id = ${id}`;
    connection.query(sqlStr,(err,data)=>{
        if(err)throw err;
        if(data.affectedRows>0){
            res.send({"error_code":0,"reason":"插入数据成功"});
        }else{
            res.send({"error_code":1,"reason":"插入数据失败"});
        }
    })
});

//修改账号路由
router.get("/AccountChange",(req,res)=>{
    //接收id
    let {id} =req.query;
    const sqlStr =`select * from Account where id = ${id}`;
    connection.query(sqlStr,(err,data)=>{
        if(err)throw err;
        res.send(data)
    });

});

router.post("/SaveeditAccount",(req,res)=>{

    //接收数据
    let{username,usergroup,editId} = req.body;
    //把数据存入数据库
    const sqlStr = `update Account set username='${username}',usergroup='${usergroup}' where id=${editId}`;

    connection.query(sqlStr,(err,data)=>{
        if (err) throw err;
        //如果大于0表示成功
        if (data.affectedRows>0){
            res.send({"error_code":0,"reason":"修改用户名成功"});
        }else{
            //防护失败对象
            res.send({"error_code":1,"reason":"修改用户名失败"});
        }
    });

});

//批量删除路由
router.get("/batchDelete",(req,res)=>{
    let {selectedId} = req.query;
    //console.log(selectedId)
    const sqlStr = `delete from account where id in(${selectedId})`;
    connection.query(sqlStr,(err,data)=>{
        if(err)throw err;
        if(data.affectedRows>0){
            res.send({"error_code":0,"reason":"删除数据成功"});
        }else{
            res.send({"error_code":1,"reason":"删除数据失败"});
        }
    })
});

router.get("/checkoldpwd",(req,res)=>{
    let {oldPwd,username} =req.query;
    const sqlStr = `select * from account where username="${username}" and password="${oldPwd}"`;
    connection.query(sqlStr,(err,data)=>{
        if(err)throw err;
        if(data.length){
            res.send({"error_code":0,"reason":"原密码一致"})
        }else{
            res.send({"error_code":1,"reason":"与原密码不一致"})
        }
    })
});

router.post("/savenewpwd",(req,res)=>{
    let {username,oldpwd,newpwd}=req.body;
    const sqlStr = `update account set password="${newpwd}" where username="${username}" and password="${oldpwd}"`;
    console.log(sqlStr)
    connection.query(sqlStr,(err,data)=>{
        if(err)throw err;
        if(data.affectedRows>0){
            res.send({"error_code":0,"reason":"修改密码成功"})
        }else {
            res.send({"error_code":1,"reason":"修改密码失败"})
        }
    })
});

router.post('/accountInfor',(req,res)=>{
   
    // // 获取username
	let { username } = req.body;
	// // 构造sql
	const sqlStr = `select * from account where username="${username}"`;
	// // 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send({ data })
    })
    
})
module.exports = router;
