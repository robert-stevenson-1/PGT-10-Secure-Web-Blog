Requires the software:
- Nodejs: https://nodejs.org/en/download/
- PostgreSql: https://www.postgresql.org/download/

Require npm Packages:

- npm install express
- npm install body-parser
- npm install pg
- npm install nodemailer
- npm install bcrypt
- npm install express-session
- npm install cookie-parser

Database setup:

You can find the create table SQL statements and the insert statement for dummy data in the folder 'PGT-10-Secure-Web-Blog/Database Scripts' 

There is a setup video for our project database here: https://www.youtube.com/watch?v=WwcUuguOZlw

Setting up the config.js file:

copy and paste this content below into the config.js (if you don't have config.js, create a copy of 'BLANK_config.js' and rename it to 'config.js')

config content:

zzvar config = {
    database: {
        user: 'PGT10_server_user', // The database username
        password: 'PGT10@Server_Password', // The database password
        host: 'localhost', // Where the database is hosted
        database: 'PGT10 DSS Server', // What the database is called
        port: 5432, // The database port
//        max: 10, // The maximum number of clients connections in the pool
    },
    site: {
        path: '../Blog Website', // The path to the website static folder
        port: 3000, // The port that the hosted site is on
    },
    gmail: {
        host: 'smtp.gmail.com',
        service: 'Gmail',
        port: 587,
        auth: {
            user: 'pgt10.dss@gmail.com', // The email address
            pass: 'gxkvuinpjkpcynsb', // The password for the email address (Main pass: Pgt10_DSS)
        }
    }
};

module.exports = config;

To run the server:

install the npm  packages in 'Server' directory and within there run 
'node .\server.js' to start the websites server and navigate to 'http://localhost:3000'