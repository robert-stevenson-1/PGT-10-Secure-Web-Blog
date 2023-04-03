/*
install links for requires software and tools:
- Nodejs: https://nodejs.org/en/download/
- PostgreSql: https://www.postgresql.org/download/
- Express: https://expressjs.com/en/
- pg module: https://www.npmjs.com/package/pg
- body parser module: https://www.npmjs.com/package/body-parser

/*
TODO:
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
//  https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/



const express = require('express'); // import express module
const bodyParser = require('body-parser'); // import body-parser
const pg = require('pg'); // import the postgresql module
const path = require('path'); // import the path module

const config = require('./config.js'); // import the config file
// import the functions for html templates generators for our site
// const templates = require('../Our Modules/templates.js');

const port = config.site.port; // set the port

console.log(path.join(__dirname, config.site.path));

const app = express(); // create express app

app.use(express.static(path.join(__dirname, config.site.path))); // set the static folder
app.use(bodyParser.json()); // parse application/json

//Link PostgreSQL database with Express in Node.js
const pool = new pg.Pool(config.database); // create a new postgresql pool
const client = pool.connect(); // create and connect a client to the database

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
app.get('/hello', (req, res) => {
  res.send('GET Hello World!');
});

//app POST method to create a resource in a REST environment
app.post('/post', (req, res) => {
  res.send('POST hello world!');
});

//app PUT method to update a resource
app.put('/put', (req, res) => {
  res.send('PUT hello world!');
});

//app list method to list all resources in a REST environment
app.listen(port, () => {
  console.log('listening on port ' + port);
});

//get the posts for the database and display them on the main page of the site
app.get('/get_posts', (req, res) => {
  console.log('Getting posts for database and sending them to be displayed');
  
  //TODO: read from the database
  
  // TODO: add the post info for each post read from the database to the JSON to return  
  //create a JSON object with the posts info ready to send to the frontend as a response for processing and displaying them
  const postToAdd = { //TEST DATA   
    posts: [
      { //post 1
      user : "CataLover231",
      postTitle : "My first post",
      postBody : "Here is my blog post. Look forwards to more.",
      datePost : "22/03/2023",
    },
  ]
  };
  
  // send the posts to add to the site in the post container
  res.json(postToAdd);
});