//store the server 'sensitive' information here
var config = {
    database: {
        user: 'PGT10_server_user', // The database username
        password: '2357', // The database password        
        host: 'localhost', // Where the database is hosted
        database: 'PGT10 DSS Server', // What the database is called
        port: 5432, // The database port
//        max: 10, // The maximum number of clients connections in the pool
    },
    site: {
        path: '../Blog Website', // The path to the website static folder (Convention suggest that this usually in a folder named 'public)
        port: 3000, // The port that the hosted site is on
    },
    gmail: {
        host: 'smtp.gmail.com',
        service: 'Gmail',
        port: 587,
        auth: {
            user: "Pgt10.dss@gmail.com", // The email address
            /*
            Setting nodemailer up to use gmail:
            - https://stackoverflow.com/questions/71477637/nodemailer-and-gmail-after-may-30-2022
            */
            pass: "gxkvuinpjkpcynsb", // The password for the email address
        }
    }
};

module.exports = config;
