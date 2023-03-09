//store the server 'sensitive' information here
var config = {
    database: {
        user: '', // The database username
        password: '', // The database password        
        host: 'localhost', // Where the database is hosted
        database: '', // What the database is called
        port: 5432, // The database port
//        max: 10, // The maximum number of clients connections in the pool
    },
    site: {
        path: '../Blog Website', // The path to the website static folder (Convention suggest that this usually in a folder named 'public)
        port: 3000, // The port that the hosted site is on
    }
};

module.exports = config;
