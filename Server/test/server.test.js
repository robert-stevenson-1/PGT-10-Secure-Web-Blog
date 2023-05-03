var server = require('../server.js');

// guide for chai style differences: https://www.chaijs.com/guide/styles/
var chai = require('chai');
chai.use(require('chai-json')); // npm module: https://www.chaijs.com/plugins/chai-json/
chai.use(require('chai-http')); // npm module: https://www.chaijs.com/plugins/chai-http/
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();

// TODO: Test we can check that a user that is in the db is found and is allowed to login
describe("Test we can check that a user that is in the db is found and is allowed to login", function(){

});

// TODO: Test we can check that a user that is NOT in the db is rejected from logging in
describe("Test we can check that a user that is NOT in the db is rejected from logging in", function (){

});

// TODO: Test we can retrieve the posts from the database through the website
describe("Test the retrieval of posts from the database through the website", function(){
    //posts = server.getPostsJSON();
    api_url =  "/getPosts" // Web GET request url

    // 'done' callback need to do the test without the test passing before the assertion is checked, 
    // as assertions are ran asynchronously. Source: https://www.chaijs.com/plugins/chai-http/ 
    it("Talks with the DB in the server and Gets the posts data successfully", function(done){
        chai.request(server.app)
            .get(api_url)
            .end(function(err, res) {
                // console.log(res)
                // check that the request response is successful
                expect(res, "Fail: Response status not 200").to.have.status(200);                
                // check that the posts data in the response is json
                expect(res.body, "Fail: No \'Posts\' property in json").have.property("posts");
                expect(res.body, "Fail: No Post(s) data found in response").have.property("posts").with.length.greaterThanOrEqual(1);
                done();
            });
    });
});

// TODO: Test we can retrieve a user from the database
describe("Test we can retrieve a user from the database", function(){

});

// TODO: Test we can retrieve a single, specific post from the database
describe("Test we can retrieve a single, specific post from the database", function(){

});

// TODO: Test we can search the database and get the result
describe("Test we can search the database and get the result", function(){

});

// TODO: Test blocking/preventing of sql injection
describe("Test blocking/preventing of sql injection", function(){

});