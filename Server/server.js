/*
install links for requires software and tools:
- Nodejs: https://nodejs.org/en/download/
- PostgreSql: https://www.postgresql.org/download/
- Express: https://expressjs.com/en/
- pg module: https://www.npmjs.com/package/pg
- body parser module: https://www.npmjs.com/package/body-parser
- nodemailer module: npm install nodemailer

Setting nodemailer up to use gmail:
- https://stackoverflow.com/questions/71477637/nodemailer-and-gmail-after-may-30-2022

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
const bcrypt = require("bcrypt");
const dbQueries = require("./SQL_queries.js"); // import the SQL queries that we will use regularly
const config = require("./config.js"); // import the config file
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
//setup the mail transporter
const transporter = nodemailer.createTransport(config.gmail);
//try to connect with the server and show the connection info (prints 'true') when the execution gets success, and error when the execution gets fail
transporter.verify().then(console.log).catch(console.error);

//setup the express server app
const port = config.site.port; // set the port
const app = express(); // create express app
app.use(express.static(path.join(__dirname, config.site.path))); // set the static folder
app.use(bodyParser.json()); // parse application/json

//Link PostgreSQL database with Express in Node.js
const pool = new pg.Pool(config.database); // create a new postgresql pool
// const client = pool.connect(); // create and connect a client to the database

//Temp store for each user's verification code together with the username that is linked to
let codes = new Map();
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

app.post("/Search", async (req, res) => {
  // To Secure against SQL injection:
  //  - Use parameterized queries (https://node-postgres.com/features/queries#Parameterized%20query)
  //    - node-postgres supports parameterized queries, passing your query text unaltered as well
  //      as your parameters to the PostgreSQL server where the parameters are safely substituted
  //      into the query with battle-tested parameter substitution code within the server itself

  // url param pass aid: https://www.digitalocean.com/community/tutorials/use-expressjs-to-get-url-and-post-parameters
  params = [
    "%" + req.query.search + "%", // Wrap the parameter in % wildcards for pattern recognition in WHERE ... LIKE query
  ];
  console.log(params);

  data = {};
  //create a client to interact with the database
  const client = await pool.connect(); // create and connect a client to the database
  //try to get the data from the database
  try {
    // Create send the query with db with the parameter values and read request from the database
    dbResult = await client.query(dbQueries.SEARCH_POSTS, params);
    // console.log(data)
    console.log(dbResult.rows);

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
    //send the data back
    res.send(postToAdd);
  } catch (error) {
    console.log(error.stack);
  } finally {
    client.end((err) => {
      // source: https://node-postgres.com/apis/client#clientend
      console.log("client has disconnected");
      if (err) {
        console.log("error during disconnection", err.stack);
      }
    });
  }
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

const SESSIONS = new Map();

app.post('/send_verify_code', async (req, res) => {
  const {username} = req.body; // get the username
  const client = await pool.connect(); // create and connect a client to the database
  
  try{
      // Query the database for the user's email with the given username
      params = [
        username
      ];
      // Create send the query with db with the parameter values and read request from the database
      dbResult = await client.query(dbQueries.GET_USER_EMAIL, params);
      
      // make sure that we only get one email address back
      if (dbResult.rows.length != 1) {
        res.json({ success: false})
      }else{
        let email = dbResult.rows[0]["email"];

        //todo: send the verification email
        sent_code = sendVerificationEmail(email);
        codes.set(username, sent_code);
        res.json({ success: true });

      }
    } catch (error) {
      console.log(error.stack);
    } finally {
      client.end((err) => {
        // source: https://node-postgres.com/apis/client#clientend
        console.log("client has disconnected");
        if (err) {
          console.log("error during disconnection", err.stack);
          res.json({ success: false});

        }
      });
    }
});

app.post('/verify_code', async (req, res) => {
  const { username, ver_code } = req.body; // get the info from the body of the request
  console.log("body:");
  console.log(req.body);
  console.log("stored codes:");
  console.log(codes);
  console.log("username: " + username);
  //check if the username given has tried to got in and got it a code linked to it
  if (codes.has(username)) {
    // check if the codes match
    console.log("submitted code: " + ver_code);
    console.log("stored code: " + codes.get(username));
    if (codes.get(username) == ver_code) {
      // success, the code matches, verify the login to go ahead
      console.log("verified");
      res.json({ success: true });
    }else {
      // failed, code doesn't match, login attempt is blocked
      console.log("failed verification");
      res.json({ success: false});
    }
    //deleted the user and its code from the temp store
    codes.delete(username);
  }else {
    // failed, username doesn't match, login attempt is blocked
    console.log("user didn't ask to login so bo codes stored");
    res.json({ success: false});
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Connect to the database using the configuration options
    const pool = new pg.Pool(config.database);

    // Query the database for the user with the given username and password
    const query = "SELECT * FROM accounts WHERE username = $1 ";
    const values = [username];

    const result = await pool.query(query, values);

    if (result.rows.length === 1) {
      // If the query returns exactly one row, the user is authenticated
      const user = result.rows[0];
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        createSession(username);

        const sessionID = crypto.randomUUID();
        SESSIONS.set(sessionID, username);
        res.cookie("sessionId", sessionID, {
          secure: true,
          httpOnly: true,
          sameSite: "strict",
        });
        res.json({ success: true });
        console.table(Array.from(SESSIONS));
        console.log("success");
      } else {
        // If the query returns no rows or more than one row, the user is not authenticated
        res.json({ success: false, message: "Invalid username or password" });
        console.log("notsuccess: password");
      }
    } else {
      // If the query returns no rows or more than one row, the user is not authenticated
      res.json({ success: false, message: "Invalid username or password" });
      console.log("notsuccess: username");
    }
  } catch (error) {
    console.log(error.stack);
  }
});

app.post("/logout", (req, res) => {
  const sessionId = res.cookie("sessionId");
  res.clearCookie("sessionId");

  SESSIONS.delete(sessionId);
  Array.from(SESSIONS).pop();
  console.table(Array.from(SESSIONS));
  res.redirect("/Index.html");
});

app.post("/signup", (req, res) => {
  const { username, password, email } = req.body;

  // Connect to the database using the configuration options
  const pool = new pg.Pool(config.database);
  console.log({ username, password, email });

  // Query the database for the user with the given username and password
  const fetchQuery = "SELECT * FROM accounts WHERE username = $1 OR email=$2";
  const fetchValues = [username, email];

  pool.connect((err, client, done) => {
    if (err) {
      console.error("Error connecting to database", err);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
      return;
    }
    client.query(fetchQuery, fetchValues, (err, result) => {
      if (err) {
        console.error("Error querying database", err);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
        done();
        return;
      }
      if (result.rows.length > 0) {
        // If the query returns exactly one row, the user is authenticated
        res.json({ success: false, message: "email already exist" });
        done();
        return;
      }
    });
    const saltValue = 10;

    bcrypt.genSalt(saltValue, (err, salt) => {
      if (err) {
        console.error("Error generating salt", err);
        return;
      }

      bcrypt.hash(password, salt, (err, hashedPassword) => {
        if (err) {
          console.error("Error hashing password", err);
          return;
        }

        const insertQuery =
          "INSERT INTO accounts(username, password, email) VALUES ($1, $2, $3) RETURNING id;";
        const insertValues = [username, hashedPassword, email];
        client.query(insertQuery, insertValues, (err, result) => {
          if (err) {
            console.error("Error querying database", err);
            res
              .status(500)
              .json({ success: false, message: "Internal server error" });
            done();
            return;
          }

          res.json({ success: true, message: "Signup is successful" });

          done();
        });
      });
    });
  });
});

/**
 * send a verification code to the email address
 * @param {string} email The email address to send the code to
 * @returns {number} The verification code sent
*/
function sendVerificationEmail(email){
  let code = generateVerificationCode();
  let email_body = "Verification Code: " + code;
  sendEmail(email, "BLOGLIFE: Verification Code", email_body);

  return code;
}

function generateVerificationCode(){
  //TODO: generate 6 digit verification code
  var minm = 000000;
  var maxm = 999999;
  return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
}

function sendEmail(to_, subject_, message_){
    transporter.sendMail({
      from: config.gmail.auth.user,
      to: to_,
      subject: subject_,
      text: message_,
      html: "",
    }).then(info => {
      // console.log({info});
    }).catch(console.error);
}

const crypto = require("crypto");
const { strict } = require("assert");

function generateToken(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") // convert to hexadecimal format
    .slice(0, length); // return the required number of characters
}

async function createSession(username) {
  const pool = new pg.Pool(config.database);
  const token = generateToken(32);
  const sessionQuery =
    "INSERT INTO sessioninfo(username,token) VALUES ($1,$2) RETURNING sessionid;";
  const sessionValues = [username, token];

  try {
    const client = await pool.connect();
    const result = await client.query(sessionQuery, sessionValues);
    client.release();
    return { success: true, message: "Session is successful" };
  } catch (err) {
    console.error("Error querying database", err);
    return { success: false, message: "Internal server error" };
  }
}

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

module.exports = {
  queryDB,
  getPostsJSON,
  app,
};
