require('dotenv').config()
const express = require('express')
const app = express()
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials','true')
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With , content-type, x-access-token');
    next();
});

var mysql = require('mysql');
var db = mysql.createConnection({
  host: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/customers', (req, res) => { 
 let sql = 'SELECT * FROM customers;' 
    let query = db.query(sql,(err,results) => { 
       if(err) throw err  
       res.json(results)   
    })
})

app.get('/customers/:id', (req, res) => {
    let sql = 'SELECT * FROM customers WHERE customerNumber = '+req.params.id+';' 
    let query = db.query(sql,(err,results) => { 
        if(err) throw err  
        res.json(results)   
    })
})
   
app.post('/cat/:name/:description', (req, res) => {
    // console.log("post")
    // console.log(req.body)
    // insert
    // req.body.
    let sql = "INSERT INTO categories(" + 
                "name," +
                "description" + 
                ")" +
            "VALUES('" +
                req.params.name + "','" +
                req.params.description + "'"+
            ");"
    let query = db.query(sql,(err,result) => {
        if(err) throw err
        res.json(result)
    })
})

app.post('/customers', (req, res) => {
    console.log("post")
    // console.log(req.body)
    console.log(req.body)
    // insert
    // req.body.
    let sql = "INSERT INTO customers(" + 
                "customerName," +
                "contactLastName," + 
                "contactFirstName," + 
                "phone," +
                "addressLine1," + 
                "addressLine2," + 
                "city," +
                "state," +
                "postalCode," +
                "country," +
                "salesRepEmployeeNumber," + 
                "creditLimit)" +
            "VALUES('" +
                req.body.customerName + "','" +
                req.body.contactLastName + "','" +
                req.body.contactFirstName + "','" +
                req.body.phone + "','" +
                req.body.addressLine1 + "','" +
                req.body.addressLine2 + "','" +
                req.body.city + "','" +
                req.body.state + "','" + 
                req.body.postalCode + "','" +
                req.body.country + "','" +
                req.body.salesRepEmployeeNumber + "','" +
                req.body.creditLimit + "'"+
            ");"
    let query = db.query(sql,(err,result) => {
        if(err) throw err
        res.json(result) 
    })
})

app.put('/customers/:id', (req, res) => {
    // console.log(req.params)
    let sql = "UPDATE customers SET customerName = '"+ req.body.customerName +"' WHERE customerNumber = "+ req.params.id + ";"
    let query = db.query(sql,(err,result) => {
        if(err) throw err
        res.json(result)
    })
})

app.delete('/customers/:id', (req, res) => {
    let sql = "DELETE FROM customers WHERE customerNumber = "+ req.params.id + ";"
    let query = db.query(sql,(err,result) => {
        if(err) throw err
        res.json(result)
    })
})

app.listen(3000, () => {
 console.log('Start server at port 3000.')
})
