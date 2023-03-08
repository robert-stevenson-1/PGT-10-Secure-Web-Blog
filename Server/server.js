/*
install links for requires software and tools:
- Nodejs: https://nodejs.org/en/download/
- PostgreSql: https://www.postgresql.org/download/
- Express: https://expressjs.com/en/
- pg module: https://www.npmjs.com/package/pg
- body parser module: https://www.npmjs.com/package/body-parser

/*
TODO:
- Connect to the database
- Create the database tables

- Implement the CRUD operations
- Allow reading from the database
- Allow writing to the database
- Allow deleting from the database
- Allow searching in the database

- Implement protection against SQL injection
- Implement protection from Account Enumeration
- Implement protection against Cross Site Scripting (XSS)
- Implement protection against Cross Site Request Forgery (CSRF)
- Implement protection against session hijacking
*/

//Linking PostgreSQL database with Express in Node.js doc source:
https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/

const express = require('express'); // import express module
const bodyParser = require('body-parser'); // import body-parser
const pg = require('pg'); // import the postgresql module


const port = process.env.PORT || 3000; // set the port
const DB_PORT = process.env.DB_PORT || 5432; // set the database port
//TODO: Update the database url to point to your database
const DATABASE_URL = process.env.DATABASE_URL || ''; // set the database url

const app = express(); // create express app
app.use(bodyParser.json()); // parse application/json

//Link PostgreSQL database with Express in Node.js
const client = new pg.Client(DATABASE_URL); // create a client to the database
client.connect(); // connect to the database

/*
source: https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/

RESTful APIs most commonly utilize HTTP requests. Four of the most common HTTP 
methods in a REST environment are GET, POST, PUT, and DELETE, which are the 
methods by which a developer can create a CRUD system.

Create: Use the HTTP POST method to create a resource in a REST environment
Read: Use the GET method to read a resource, retrieving data without altering it
Update: Use the PUT method to update a resource
Delete: Use the DELETE method to remove a resource from the system
*/ 

//app GET method to read a resource, retrieving data without altering it
app.get('/', (req, res) => {
  res.send('GET Hello World!');
});

//app POST method to create a resource in a REST environment
app.post('/a', (req, res) => {
  res.send('POST hello world!');
  
  // template POST method content:

  // const { title, body } = req.body;
  // const sql_query = 'INSERT INTO posts (title, body) VALUES ($1, $2) RETURNING *';
  // const values = [title, body];
  // client.query(sql, values)
  // .then((result) => {
  //     res.json(result.rows[0]);
  //   })
  // .catch((err) => {
  //     res.status(500).json(err);
  //   });
});

//app PUT method to update a resource
app.put('/b', (req, res) => {
  res.send('PUT hello world!');
});

//app list method to list all resources in a REST environment
app.listen(port, () => {
  console.log('Example app listening on port ${port}!');
});