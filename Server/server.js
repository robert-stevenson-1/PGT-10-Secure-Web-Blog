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

- Implement protection against SQL injection
- Implement protection from Account Enumeration
- Implement protection against Cross Site Scripting (XSS)
- Implement protection against Cross Site Request Forgery (CSRF)
- Implement protection against session hijacking
*/

//Linking PostgreSQL database with Express in Node.js doc source:
//  https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/

// IMPORTS
const express = require("express"); // import express module
const bodyParser = require("body-parser"); // import body-parser
const pg = require("pg"); // import the postgresql module
const path = require("path"); // import the path module

const DB_Queries = require("./SQL_queries.js"); // import the SQL queries that we will use regularly
const config = require("./config.js"); // import the config file

//setup the express server app
const port = config.site.port; // set the port
const app = express(); // create express app
app.use(express.static(path.join(__dirname, config.site.path))); // set the static folder
app.use(bodyParser.json()); // parse application/json

//Link PostgreSQL database with Express in Node.js
const pool = new pg.Pool(config.database); // create a new postgresql pool
// const client = pool.connect(); // create and connect a client to the database

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

//app list method to list all resources in a REST environment
app.listen(port, () => {
  console.log("Server listening and started at http://localhost:" + port);
});

// API Request Methods:

app.get("/getIndex", (req, res) => {
  console.log(path.join(__dirname, config.site.path, "/index.html"));
  res.sendFile(path.join(__dirname, config.site.path, "/index.html"));  
});

//get the posts for the database and display them on the main page of the site
app.get("/get_posts", async (req, res) => {
  // console.log("Getting posts for database and sending them to be displayed");

  // make a read request from the database
  db_result = await queryDB(DB_Queries.GET_ALL_POSTS);

  //create a JSON object for posts info to send to the frontend as a response for processing and displaying
  const postToAdd = {
    //TEST DATA
    posts: [],
  };

  // TODO: add each posts info to the JSON to return
  for (var key in db_result.rows) {
    if (db_result.rows.hasOwnProperty(key)) {
      var rowJSON = db_result.rows[key];
      //convert the SQL timestamp format to dd/mm/yyyy date format
      tempDate = new Date(rowJSON.created_at).toLocaleDateString("en-GB");

      postJSON = {
        user: rowJSON.username,
        postTitle: rowJSON.title,
        postBody: rowJSON.content,
        datePost: tempDate,
      };
      postToAdd.posts.push(postJSON);
    }
  }

  // send the posts to add to the site in the post container
  res.json(postToAdd);
});

async function queryDB(query) {
  data = {}

  //create a client to interact with the database
  const client = await pool.connect(); // create and connect a client to the database
  
  //try to get the data from the database
  try {
    // make a read request from the database
    data = await client.query(DB_Queries.GET_ALL_POSTS);
    // console.log(db_result.rows)
  } finally {
    client.end((err) => {
      // source: https://node-postgres.com/apis/client#clientend
      console.log("client has disconnected");
      if (err) {
        console.log("error during disconnection", err.stack);
      }
    });
  }
  
  return data;
}
