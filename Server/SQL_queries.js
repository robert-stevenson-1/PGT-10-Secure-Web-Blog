/**
 * File to containing all the SQL queries used to interact with our PostgreSQL database
 */

// get all the posts from the database
const GET_ALL_POSTS = 'SELECT * FROM posts';
//look for user who has a matching Username and password
const GET_USER = 'SELECT id, username, email FROM accounts WHERE username = $1 AND password = $2';
// check if the a user exists in the database. Returns 1 is user exists and 0 is they don't exist.
const USER_EXIST = 'SELECT COUNT(*) FROM accounts WHERE username = $1 AND password = $2';


module.exports = {
    GET_ALL_POSTS,
    GET_USER,
    USER_EXIST,
}