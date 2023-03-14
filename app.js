const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql')
const app = express(); // creates an instance of express
const port = 3000;

//----------1st load----------
//load middlewares
//loads register front-end/client pages (html,css,js), enable json readability, bodyparser allows json body to be interpreted right away
app.use('/public',express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //to read json on server side
app.use(express.json());

//establishing connection to MySQL hosted locally
/*
  for future usage,
  checkout connection pooling function, this is to enhance the performance of executing commands on a database.
  https://github.com/mysqljs/mysql/blob/master/Readme.md#install , pooling connections section
*/

let connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'password',
  database: 'putraride'
})

connection.connect()

app.listen(port,()=>{
  console.log(`Listening to port ${port}`)
});


//handling GET requests
app.get('/',(req, res)=>{
  
  res.sendFile('pageshtml/register.html', { root: __dirname })
});
app.get('/login/',(req,res)=>{
    res.sendFile('pageshtml/login.html', {root: __dirname})
})

app.get('/HomePage/',(req,res)=>{
  res.sendFile('pageshtml/HomePage.html', {root: __dirname})
})
app.get('/Navigation',(req,res)=>{
  res.sendFile('pageshtml/BusNav.html', { root: __dirname })

})
app.get('/Navigation_',(req,res)=>{
  res.sendFile('pageshtml/BusNav2.html', { root: __dirname })

})
app.get('/from-to-data.json',()=>{
  
})
//handle POST requests

app.post('/', (req, res) => {
    const matric = req.body.matric;
    const email = req.body.email; //passed by the 1st then, only works with bodyParser enabled and required
    const uid = req.body.uid;
    const password = req.body.password
    RegisterQuery(connection, uid, email, matric,password) 
    console.log(`Received string: ${email} and ${uid} and ${password} and ${matric} `); //testing if req reached, password need to be encrypted for future reference
    connection.end()
    
});

app.post('/from_to',(req,res)=>{
    const Data = req.body;
    const from = Data.from;

    if(from=='FSKTM'){
      res.redirect(301,'/Navigation');
    }else if (from=='Sultan Abdul Samad Library'){
      res.redirect(301,'/Navigation_');
    }

    
})

function RegisterQuery(connection, UID, email, Matric_No, password){
  let userData = [UID, email, Matric_No, password]
  connection.query('INSERT INTO `USERS` VALUES (?,?,?,?)', userData,(error, results)=>{
      if(error){
        console.log('Error inserting to Users : ' + error.stack)
      }
      console.log(results)
  });
}

function createConnection(connection){
  connection.ping((err)=>{
    if (err) {
      connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'password',
        database: 'putraride'
      })
      connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
        console.log('connected as id ' + connection.threadId);
      });
    }
  })
  
  return connection;
}



// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.post('/submit-form', (req, res) => {
//   const name = req.body.name;
//   console.log(`Name: ${name}`);
//   res.send(`Hello, ${name}!`);
// });

//listen request
 //defaults local host and also already create server


