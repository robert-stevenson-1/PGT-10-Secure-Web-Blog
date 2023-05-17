// const { response } = require("express");

const formBlogPost = document.getElementById('newBlogPost');
const postTitle = document.getElementById("postTitle");
const  postContent = document.getElementById("postContent");
// const userId = document.getElementById("userId");


formBlogPost.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log("test")
    let blogUserId = await fetchUserID();
    let newcsrfToken = await fetchcsrfToken();
    //let csrfToken = await fetchcsrfToken();
    const blogTitle = postTitle.value;
    const blogContent = postContent.value;
    const responseDiv = document.getElementById('response');
    console.log("test2")
    console.log("Title: ", blogTitle)
    console.log("Body: ", blogContent)
    console.log("ID: ", blogUserId);
    console.log("csrf", newcsrfToken);
    

    const response = await fetch('/addpost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ blogUserId, blogTitle, blogContent,newcsrfToken})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
                // Redirect to the home page
            window.location.href = "/posts.html";
            
    
        } else {
                // Display an error message
            const error = document.querySelector('#error');
            responseDiv.innerText = 'Unsuccessful';
            error.textContent = data.message;
            }
        })
        .catch(error => console.error(error));
    
});

async function fetchUserID() {
    var id;

    const response = await fetch("/userId", { method: "GET" })
        .then((response) => {
            return response.json(); // return the JSON of the response
        })
        .then(function (data) {
            console.log("(fetchUserID) data.userid = "+ data.userid);
            id = data.userid;
             // display the userid value in an element with id="userid"
        })
        .catch((error) => {
            console.log(error);
            alert("An error getting userİD");
        });
    console.log("(fetchUserID) "+ id);
    return id;
}
async function fetchcsrfToken(){
    var csrf;
    const response = await fetch("/csrf", { method: "GET" })
        .then((response) => {
            return response.json(); // return the JSON of the response
            console.log(response)
        })
        .then(function (data) {
            csrf = data.csrf;
            console.log("csrf ??" + csrf);
        })
        .catch((error) => {
            console.log(error);
            alert("An error getting csrf");
        })
        console.log("(fetchUserID) "+ csrf);
    return csrf;

}
async function navToPost() {
    window.location.href = "posts.html"
}

