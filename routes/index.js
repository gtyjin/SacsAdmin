// <!--Author: TJ
// License: HansCreative corperation
// License URL: http://creativecommons.org/licenses/by/3.0/-->


var express = require('express');
var SHA1 = require("crypto-js/sha1");
var axios = require('axios');
var CryptoJS = require("crypto-js");
var app = express();

var mysql = require('mysql2');

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
 
const secret = 'sacs';

const encryptSHA1 = (text) => {
  return SHA1(text).toString(CryptoJS.enc.Hex);
}

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
app.get('/login', function(req, res, next) {
  res.render('login');
});



app.get('/us', function(req, res, next) {
  res.render('userstat');
});

app.get('/ue', async function(req, res, next) {   /* 사용자 수정 기능 입력 페이지  */
var userID = req.query.userID;

const sql = 'SELECT * FROM sacsdb.user where userID = ' + userID
  const client = await createConnection()
  const [row] = await client.promise().query(sql);


  res.render('useredit',{user:row[0]});
});

app.get('/ape', async function(req, res, next) {   /* AP 수정 기능 입력 페이지  */
var apnu = req.query.apnum;

  const sql = 'SELECT * FROM sacsdb.ap where apnum = ' + apnu
  const client = await createConnection()
  const [row] = await client.promise().query(sql);


  res.render('apedit',{ap:row[0]});
});

app.post('/ape',async function(req, res, next) {  /* ap Update기능 */
  const apnu = req.body.apnum;
  const mac = req.body.mac;
  const ip = req.body.ip;
  const fwv = req.body.fwv;
  const idate = req.body.idate;
  const location = req.body.location;
  const admn =  req.body.admn;
  try {
    const sql = `update sacsdb.ap set mac="${mac}", ip="${ip}", fwv="${fwv}", idate="${idate}", admn="${admn}", location="${location}"  where apnum = ${apnu};`
    const client = await createConnection()
    await client.promise().query(sql);

    res.send
    
    (200);
  } catch(e) {
    console.log(e);

    res.send(500);
  }
});

app.post('/ue',async function(req, res, next) {  /* 사용자 Update기능 */
  const userId = req.body.userID;
  const userName = req.body.userName;
  const dept = req.body.dept;
  const phoneNum = req.body.phoneNum;
  const crypto =  encryptSHA1(req.body.phoneNum);
  try {
    const sql = `update sacsdb.user set userName = "${userName}", dept = "${dept}", crypto="${crypto}", phoneNum = "${phoneNum}" where userID = ${userId};`
    const client = await createConnection()
    await client.promise().query(sql);

    res.send(200);
  } catch(e) {
    console.log(e);

    res.send(500);
  }
});

app.get('/ul', async function(req, res, next) {  /*  사용자 리스트 */

  const sql = `SELECT * FROM sacsdb.user;`
  const client = await createConnection()
  const [row] = await client.promise().query(sql);


  res.render('userlist',{userList:row});
});

app.get('/ua', async function(req, res, next) {  /*  사용자 추가 */

  res.render('useradd');
});

app.post('/ua', async function(req, res, next) {
  var userID = req.body.userID;
  var userName = req.body.userName;
  var phoneNum = req.body.phoneNum;
  var crypto =  encryptSHA1(req.body.phoneNum);
  var dept = req.body.dept;
  

  // console.log(req.body.phoneNum);
  // console.log(encryptSHA256(req.body.phoneNum));

  // crypto = encryptSHA256(req.body.phoneNum);
  const sql= 'INSERT INTO sacsdb.user(userID,userName,phoneNum,crypto,dept) VALUES (?,?,?,?,?);'
  const client = await createConnection();
  const [row] = await client.promise().query(sql, [userID,userName,phoneNum,crypto,dept]);
  res.send(200); 

});

app.get('/apl', async function(req, res, next) {  /*  AP 리스트 */
   try {
  const sql = `SELECT * FROM sacsdb.ap;`
  const client = await createConnection()
  const [row] = await client.promise().query(sql);
  res.render('aplist',{aplist:row});
  } catch(e) {
  console.log(e);
 }
});


app.get('/apa', function(req, res, next) {  /*  AP 추가페이지 */

  res.render('apadd');
});

app.post('/apa',async function(req,res, next){ /*  AP 추가 기능 */
  var apnum = req.body.apnum;
  var mac = req.body.mac;
  var ip = req.body.ip;
  var swv = req.body.swv;
  var idate = req.body.idate;
  var location = req.body.location;
  var admn = req.body.admn;

  // console.log(req.body.mac);
  // console.log(encryptSHA256(req.body.mac));

  const sql= 'INSERT INTO sacsdb.ap(apnum,mac,ip,swv,idate,location,admn) VALUES (?,?,?,?,?,?,?);'
  const client = await createConnection();
  const [row] = await client.promise().query(sql, [apnum,mac,ip,swv,idate,location,admn]);
  res.send(200);
  });



app.get('/apei', function(req, res, next) {
  res.render('apei');
});


app.post('/delete',async function(req, res, next) {  /* 사용자 삭제 기능 */
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

app.post('/deleteap',async function(req, res, next) {  /* AP 삭제 기능 */
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
