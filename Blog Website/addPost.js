const { response } = require("express");

const formBlogPost = document.getElementById('newBlogPost');
const postTitle = document.getElementById("postTitle");
const  postContent = document.getElementById("postContent");
// const userId = document.getElementById("userId");
const userId = 1

formBlogPost.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log("test")
    const blogUserId = 1
    const blogTitle = postTitle.value;
    const blogContent = postContent.value;
    const responseDiv = document.getElementById('response');
    console.log("test2")
    console.log("Title: ", blogTitle)
    console.log("Body: ", blogContent)
    console.log("ID: ", blogUserId)

    const response = await fetch('/addpost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ blogUserId, blogTitle, blogContent })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Redirect to the home page
                window.location.href = '/posts.html';
    
            } else {
                // Display an error message
                const error = document.querySelector('#error');
                responseDiv.innerText = 'Unsuccessful';
                error.textContent = data.message;
            }
        })
        .catch(error => console.error(error));
});

// // Function to show successful blog post response
// function postResponse() {
//     divMain = document.getElementById('main')

//     var divPostResponse = document.createElement('div')
//     var h2PostReponse = document.createElement('h2')

//     // arrange where insert element
//     divPostResponse.appendChild(h2PostReponse)
//     divMain.appendChild(divPostResponse)
// }