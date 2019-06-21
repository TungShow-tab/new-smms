var express = require('express');
var router = express.Router();

const connection = require('./js/conn')

router.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'authorization') // 允许携带的头
	
	next() // 放行
})

router.post('/goodsadd', (req, res) => {
  let { classify, code, goodsname, price, vendibility, purchase, quantity, weight, units, offer, sales, description } = req.body;
  const sqlStr = `insert into goods(classify,code,goodsname,price,vendibility,purchase,quantity,weight,units,offer,sales, description) values ('${classify}','${code}','${goodsname}','${price}', '${vendibility}', '${purchase}','${quantity}', '${weight}', '${units}','${offer}', '${sales}', '${description}')`;
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // 判断受影响的行数
    if (data.affectedRows > 0) {
      // 如果大于0 代表插入成功 那么就给前端返回成功的数据对象
      res.send({ "error_code": 0, "reason": "插入数据成功" });
    } else {
      // 失败：返回给前端失败的数据对象
      res.send({ "error_code": 1, "reason": "插入数据失败" });
    }
  })
  // res.send("1")
});

router.get('/goodsmanagment', (req, res) => {
  const sqlStr = 'select * from goods';
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    res.send(data);
  })
});

router.get('/goodslistbypage', (req, res) => {
  let { pageSize, currentPage } = req.query;
  let sqlStr = `select * from goods order by ctime desc`;
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    let total = data.length;
    let n = (currentPage - 1) * pageSize;
    sqlStr += ` limit ${n}, ${pageSize}`;
    connection.query(sqlStr, (err, data) => {
      if (err) throw err;
      res.send({
        total,
        data
      })
    })
  })
});

router.get('/goodsedit', (req, res) => {
  let { id } = req.query;
  const sqlStr = `select * from goods where id=${id}`;
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    res.send(data);
  })
});


router.get('/goodsdelete', (req, res) => {
  let { id } = req.query;
  console.log(id)
  const sqlStr = ` delete from goods where id='${id}'`;
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // 判断受影响的行数
    if (data.affectedRows > 0) {
      // 如果大于0 代表插入成功 那么就给前端返回成功的数据对象
      res.send({ "error_code": 0, "reason": "删除数据成功" });
    } else {
      // 失败：返回给前端失败的数据对象
      res.send({ "error_code": 1, "reason": "删除数据失败" });
    }
  })

});

router.get('/goodslist', (req, res) => {
  let { id } = req.query;
  const sqlStr = `select * from goods where id='${id}'`;
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    res.send(data);
  })
});
router.post('/savegoods', (req, res) => {
  let { totalinventory,salesprice,totalsales,classify, code, goodsname, price, vendibility, purchase, quantity, weight, units, offer, sales, description, id } = req.body;
  console.log(id)
  if (id) {
    const sqlStr = `update goods set classify='${classify}', totalinventory='${totalinventory}',salesprice='${salesprice}',totalsales ='${totalsales}',code='${code}',goodsname='${goodsname}',price='${price}',vendibility='${vendibility}',purchase='${purchase}',quantity='${quantity}',weight='${weight}',units='${units}',offer='${offer}',sales='${sales}', description='${description}' where id=${id}`;
    connection.query(sqlStr, (err, data) => {
      if (err) throw err;
      // 判断受影响的行数
      if (data.affectedRows > 0) {
        // 如果大于0 代表插入成功 那么就给前端返回成功的数据对象
        res.send({ "error_code": 0, "reason": "修改商品成功" });
      } else {
        // 失败：返回给前端失败的数据对象
        res.send({ "error_code": 1, "reason": "修改商品失败" });
      }
    })
  } else {
    const sqlStr = `insert into goods(classify,code,goodsname,price,vendibility,purchase,quantity,weight,units,offer,sales, description,totalinventory,salesprice,totalsales) values ('${classify}','${code}','${goodsname}','${price}', '${vendibility}', '${purchase}','${quantity}', '${weight}', '${units}','${offer}', '${sales}', '${description}','${salesprice}','${totalinventory}','${totalsales}')`;
    connection.query(sqlStr, (err, data) => {
      if (err) throw err;
      // 判断受影响的行数
      if (data.affectedRows > 0) {
        // 如果大于0 代表插入成功 那么就给前端返回成功的数据对象
        res.send({ "error_code": 0, "reason": "添加商品成功" });
      } else {
        // 失败：返回给前端失败的数据对象
        res.send({ "error_code": 1, "reason": "添加商品失败" });
      }
    })
  }


});
router.get('/search', (req, res) => {
  let { classify, keyword } = req.query;
  let sqlStr = `select * from goods where 1=1`
  if (classify) {
    sqlStr += ` and classify='${classify}'`;
  }
  if (keyword) {
    sqlStr += ` and (goodsname like '%${keyword}%' or code like '%${keyword}%')`
  }

  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    res.send(data)
  })
})


module.exports = router;
