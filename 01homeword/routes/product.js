const express=require('express');
const pool=require('../pool.js')
//创建路由器对象
var router=express.Router;
//添加路由
//1商品列表
router.get('/list',function(req,res){
	var obj=req.query;
	var pno=obj.pno;
    var size=obj.size;
	if(!pno) pno=1;
    if(!size) size=9;
	pno=parseInt(pno);
    size=parseInt(size);
	var start=(pno-1)*size;
    res.send('商品列表');
pool.query('SELECT lid,price,title FROM xz_laptop LIMIN ?,?',
[atart,size],function(err,result){
if(err)throw err;
res.send(result);});
})
module.exports=router;