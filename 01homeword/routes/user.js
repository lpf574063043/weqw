const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
var router=express.Router();
var queryString=require('querystring')
//添加路由
//1.用户注册
router.post('/reg',function(req,res){
  //1.1获取post请求数据
  var obj=req.body;
  console.log(obj);
  //1.2验证数据是否为空
  if(!obj.uname){
    res.send({code:401,msg:'uname required'});
	//阻止往后执行
    return;
  }
  if(!obj.upwd){
    res.send({code:402,msg:'upwd required'});
	return;
  }
  if(!obj.email){
    res.send({code:403,msg:'email required'});
	return;
  }
  if(!obj.phone){
    res.send({code:404,msg:'phone required'});
	return;
  }
  //1.3执行SQL语句
  pool.query('INSERT INTO xz_user SET ?',[obj],function(err,result){
    if(err) throw err;
	//console.log(result);
	//如果注册成功
	//{ code:200, msg:'register suc' }
    if(result.affectedRows>0){
	  res.send({code:200, msg:'register suc'});
	}
  });
  
});




router.post('/login',function(req,res){
var obj2=req.body

if(!obj2.uname){
res.send({code:401,msg:'uname required'});
return;
}
if(!obj2.upwd){
res.send({code:402,msg:'upwd required'})
return;
}
//执行sql语句
//查找用户名和密码
pool.query('SELECT * FROM xz_user WHERE uname=? AND upwd=?',
[obj2.uname,obj2.upwd],function(err,result){
if(err) throw err;
//console.log(result)
//判断登录是否成功
if(result.length>0){
res.send({code:200,msg:'login suc'});
}else{
res.send({code:301,msg:'login err'});
}
});
});



router.get('/detail',function(req,res){
  var obj3=req.query;
  if(!obj3.uid){
  res.send({code:401,msg:'uid required' })
    return;
  }
pool.query('SELECT * FROM xz_user WHERE uid=?',[obj3.uid],function
	(err,result){
if(err)throw err;
if(result.length>0){
res.send(result[0]);
}else{
res.send({code:301,msg:'can ont found'})
}
})
})




router.get('/update',function(req,res){
var obj4=req.query;
var i=400
for(var key in obj4){
	i++;
if(!obj4[key]){
res.send({code:i,msg:key+'required'})
   return;
      }
   }
pool.query('UPDATE xz_user SET ? WHERE uid=?',[obj4,obj4.uid],
function(err,result){
if(err)throw err;
//console.log(result)
if(result.affectedRows>0){
res.send({code:200,msg:'update suc'})
}else{
res.send({code:301,msg:'update err'})
}
})
});



router.get('/list',function(req,res){
var str=req.query;
var pno=str.pno;
var size=str.size;
if(!pno) pno=1;
if(!size) size=3;

pno=parseInt(pno);
size=parseInt(size);
var start=(pno-1)*size;
pool.query('SELECT * FROM xz_user LIMIT ?,?',[start,size],function
(err,result){if(err)throw err;
res.send(result)})
});


router.get('/delete',function(req,res){
var obj=req.query;
if(!obj.uid){res.send({code:401,msg:'uid required'})
return;	
}
pool.query('DELETE FROM xz_user WHERE uid=?',[obj],function(err,
result){
	if(err)throw err;
	if(result.affectedRows>0){
	res.send({code:200,msg:'删除成功'})
	}else{
	res.send({code:301,msg:'删除失败'})
	}
})
})


/*router.get('delete',function(req.res){
var obj=req.query;
if(!obj.uid){
res.send({code:401,msg:'uid required'})
	return;
}
pool.query('DELETE FROM xz_user WHERE uid=?',[obj],function
	(err,result){
if(err)throw err;
if(result.affectedRwos>0){
res.send({code:200,msg:'delete suc'})
}else{
res.send({code:301,msg:'delete err'})
}
});
})
module.exports=router;*/


