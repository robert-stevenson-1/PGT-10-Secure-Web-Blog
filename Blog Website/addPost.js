// const { response } = require("express");

const formBlogPost = document.getElementById('newBlogPost');
const postTitle = document.getElementById("postTitle");
const  postContent = document.getElementById("postContent");
// const userId = document.getElementById("userId");
const userId = 1

formBlogPost.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log("post submit attempt")
    const blogUserId = 1
    const blogTitle = postTitle.value;
    const blogContent = postContent.value;
    // const responseDiv = document.getElementById('response');
    console.log("test2")
    console.log("Title: ", blogTitle)
    const cleanBlogTitle = blogTitle.replace(/[^a-zA-Z0-9 \.\-?!"'&+\n]/g, '');
    console.log("Sanitised Title: ", cleanBlogTitle)
    console.log("Body: ", blogContent)
    const cleanBlogContent = blogContent.replace(/[^a-zA-Z0-9 \.\-?!"'&+\n]/g, '');
    console.log("Sanitised Body: ", cleanBlogContent)
    console.log("ID: ", blogUserId)
    modal.style.display = "block";
    console.log('response modal triggered')
    console.log('Response: ', window.location.href)

    const response = await fetch('/addpost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ blogUserId, cleanBlogTitle, cleanBlogContent })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Blog post success mk2')
                // Redirect to the home page
                window.location.href = '/posts.html';
                //success modal
                modal.style.display = "block"
    
            } else {
                // Display an error message
                const error = document.querySelector('#error');
                responseDiv.innerText = 'Unsuccessful';
                error.textContent = data.message;
            }
        })
        .catch(error => console.error(error));
});

// Function for successful blog post modal
var modal = document.getElementById("responseModal");

// Button that opens the modal
var btn = document.getElementById("submitBtn");

// <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// // button trigger for modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// close modal by clicking X
span.onclick = function() {
  modal.style.display = "none";
}

// close modal by clicking outside modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}