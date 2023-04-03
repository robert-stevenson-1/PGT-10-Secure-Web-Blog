window.onload = onload()

function onload() {
    console.log('Page loaded');
    // make a GET request for the post in the database on the server
    fetch('/get_posts',
    {
        method: 'GET',
    }).then(function(response){ //with the response....
        return response.json() // return the JSON of the response
    })
    .then(data => processPosts(data))
    .catch(error => console.error(error)); // catch any error and print it out
}

function processPosts(posts) { //with the JSON response data
    posts = posts.posts
    //get the posts container from the DOM
    postsContainer = document.getElementById('Posts')
    //TODO: process the response data (Posts) into HTML elements that can be added to our website
    for (var postKey in posts) {
        //create a new post element
        postElement = generatePostTemplate(
            posts[postKey].postTitle, 
            posts[postKey].postBody,
            posts[postKey].user,
            posts[postKey].datePost)
        //add it to the Page
        postsContainer.appendChild(postElement)
    }
}

function generatePostTemplate(post_title, post_body, post_user, post_date){
    // create the container of the post
    var div_post_container = document.createElement('div');
    var div_center = document.createElement('div'); // container for centering the post
    var h3_post_title = document.createElement('h3');
    var p_post_body = document.createElement('p');
    var div_post_info = document.createElement('div');
    var div_post_user = document.createElement('div');
    var div_post_date = document.createElement('div');

    // structure all the post's elements
    div_post_container.appendChild(div_center);
    div_post_container.appendChild(div_post_info);
    div_center.appendChild(h3_post_title);
    div_center.appendChild(p_post_body);
    div_post_info.appendChild(div_post_user);
    div_post_info.appendChild(div_post_date);

    //add the style tags to the HTML elements
    div_post_container.classList.add('container-posts');
    div_center.classList.add('container-center')
    div_post_user.classList.add('left-aligned')
    div_post_date.classList.add('right-aligned')

    // add the information to the relevant post elements
    h3_post_title.textContent = post_title;
    div_post_user.textContent = "Posted by: " + post_user;
    div_post_date.textContent = "Date Posted: " + post_date;
    p_post_body.textContent = post_body;

    //return the created post html object
    return div_post_container

}
