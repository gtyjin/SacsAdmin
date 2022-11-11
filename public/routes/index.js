// <!--Author: TJ
// License: HansCreative corperation
// License URL: http://creativecommons.org/licenses/by/3.0/-->

var express = require('express');
var router = express.Router();

var mysql      = require('mysql2');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'hans3180',
//   database : 'sacsdb'
// });

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
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/add', function(req, res, next) {
  res.render('form');
});

router.get('/us', function(req, res, next) {
  res.render('userstat');
});

router.get('/ul', async function(req, res, next) {
  // sql문 이용하여 데이터 받
  const sql = `SELECT * FROM sacsdb.user;`
  const client = await createConnection()
  const [row] = await client.promise().query(sql);


  res.render('userlist', {userList: row});
});

router.get('/ua', function(req, res, next) {
  res.render('useradd');
});

router.get('/ai', function(req, res, next) {
  res.render('apinfo');
});

router.get('/apa', function(req, res, next) {
  res.render('apadd');
});

router.get('/su', function(req, res, next) {
  res.render('signup');
});

router.get('/view', function(req, res, next) {
  res.render('table');
});

module.exports = router;