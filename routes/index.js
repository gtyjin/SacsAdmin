var express = require('express');
var app = express();

var mysql      = require('mysql2');

const createConnection = () => {
  return new Promise((resolve, reject) => {
    try {
      const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'hans3180',
        database : 'sacsdb'
      });
      resolve(connection)
    } catch(e) {
      console.log(e)
    }
  })
}
 


/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
app.get('/login', function(req, res, next) {
  res.render('login');
});

app.get('/add', function(req, res, next) {
  res.render('form');
});

app.get('/us', function(req, res, next) {
  res.render('userstat');
});

app.get('/ul', async function(req, res, next) {
  // sql문 이용하여 데이터 받아와
  const sql = `SELECT * FROM sacsdb.user;`
  const client = await createConnection()
  const [row] = await client.promise().query(sql);


  res.render('userlist',{userList:row});
});

app.get('/ua', function(req, res, next) {
  res.render('useradd');
});

app.get('/apl', async function(req, res, next) {
   // sql문 이용하여 데이터 받아와
   try {
  const sql = `SELECT * FROM sacsdb.ap;`
  const client = await createConnection()
  const [row] = await client.promise().query(sql);
  res.render('aplist',{aplist:row});
  } catch(e) {
  console.log(e);
 }
});


app.get('/apa', function(req, res, next) {
  res.render('apadd');
});

app.post('/apa',async function(req,res, next){
  var mac = req.body.mac;
  var ip = req.body.ip;
  var fwv = req.body.fwv;
  var idate = req.body.idate;
  var location = req.body.location;
  var admin = req.body.admin;

  const sql= 'INSERT INTO sacsdb.ap(mac,ip,fwv,idate,location,admin) VALUES("?","?","?","?","?","?");'
  const client = await createConnection();
  const [row] = await client.promise().query(sql);
  client.query(sql,[$req.query.mac,$req.query.ip,fwv,idate,location,admin],function(err,row,fields){
    // client.query(sql,function(err,row,fields){
    if(err){
      console.log(err);
    } else{
      res.render('apinfo',{apinfo:row});
    }
  });
  });

app.get('/su', function(req, res, next) {
  res.render('signup');
}); 

app.get('/apei', function(req, res, next) {
  res.render('apei');
});

app.get('/view', function(req, res, next) {
  res.render('table');
});

app.get('/edit', function(req, res, next) {
  res.render('useredit');
});

// app.get('/info',async function(req, res, next) {
//   try {
//     const sql = `SELECT * FROM sacsdb.user where userID = ${req.query.userId};`
//     const client = await createConnection()
//     const [row] = await client.promise().query(sql);

//     res.send({userInfo: row[0]});
//   } catch(e) {
//     console.log(e);

//     res.send(500);
//   }
// });

app.post('/delete',async function(req, res, next) {
  try {
    const sql = `DELETE FROM sacsdb.user where userID = ${req.body.userId};`
    const client = await createConnection()
    await client.promise().query(sql);

    res.send(200);
  } catch(e) {
    console.log(e);

    res.send(500);
  }
});

app.post('/deleteap',async function(req, res, next) {
  try {
    const sql = `DELETE FROM sacsdb.ap where apnum = ${req.body.apnum};`
    const client = await createConnection()
    await client.promise().query(sql);

    res.send(200);
  } catch(e) {
    console.log(e);

    res.send(500);
  }
});


module.exports = app;
