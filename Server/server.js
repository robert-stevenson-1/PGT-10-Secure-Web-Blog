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

const dbQueries = require("./SQL_queries.js"); // import the SQL queries that we will use regularly
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

//get the posts for the database and display them on the main page of the site
app.get("/getPosts", async (req, res) => {
  // console.log("Getting posts for database and sending them to be displayed");

  posts = await getPostsJSON();

  // send the posts to add to the site in the post container
  res.send(posts);
});

async function getPostsJSON() {
  // make a read request from the database
  dbResult = await queryDB(dbQueries.GET_ALL_POSTS);

  //create a JSON object for posts info to send to the frontend as a response for processing and displaying
  const postToAdd = {
    //TEST DATA
    posts: [],
  };

  // add each posts info to the JSON to return
  for (var key in dbResult.rows) {
    if (dbResult.rows.hasOwnProperty(key)) {
      var rowJSON = dbResult.rows[key];
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

  return postToAdd;
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Connect to the database using the configuration options
  const pool = new pg.Pool(config.database);
  pool.connect((err, client, done) => {
      if (err) {
          console.error('Error connecting to database', err);
          res.status(500).json({ success: false, message: 'Internal server error' });
          return;
      }

      // Query the database for the user with the given username and password
      const query = 'SELECT * FROM accounts WHERE username = $1 AND password = $2';
      const values = [username, password];
      client.query(query, values, (err, result) => {
          done(); // Release the client back to the pool

          if (err) {
              console.error('Error querying database', err);
              res.status(500).json({ success: false, message: 'Internal server error' });
              return;
          }

          if (result.rows.length === 1) {
              // If the query returns exactly one row, the user is authenticated
              res.json({ success: true });
              console.log("success");
          } else {
              // If the query returns no rows or more than one row, the user is not authenticated
              res.json({ success: false, message: 'Invalid username or password' });
              console.log("notsuccess");
          }
      });
  });
});

async function queryDB(query) {
  data = {};

  //create a client to interact with the database
  const client = await pool.connect(); // create and connect a client to the database

  //try to get the data from the database
  try {
    // make a read request from the database
    data = await client.query(dbQueries.GET_ALL_POSTS);
    // console.log(dbResult.rows)
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

//submit new blog post
app.post('/add-post', (req, res) => {
  const { title, content } = req.body;
  const query = 'INSERT INTO posts (title, content) VALUES ($1, $2)';
  const values = [title, content];

  pool.query(query, values, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.redirect('/');
    }
  });
});

module.exports = {
  queryDB,
  getPostsJSON,
  app,
};