const express=require('express');
const pool=require('../pool.js')
//����·��������
var router=express.Router;
//����·��
//1��Ʒ�б�
router.get('/list',function(req,res){
	var obj=req.query;
	var pno=obj.pno;
    var size=obj.size;
	if(!pno) pno=1;
    if(!size) size=9;
	pno=parseInt(pno);
    size=parseInt(size);
	var start=(pno-1)*size;
    res.send('��Ʒ�б�');
pool.query('SELECT lid,price,title FROM xz_laptop LIMIN ?,?',
[atart,size],function(err,result){
if(err)throw err;
res.send(result);});
})
module.exports=router;