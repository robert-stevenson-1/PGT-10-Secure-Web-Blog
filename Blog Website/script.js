//set the events
window.onload = onload()

/**
 * On the page load, run...
 */
function onload() {
    console.log('Page loaded');
    
    if(!isLoggedIn()) {
        addLoginSignupButtons()
    }
    
    // check what page we are on
    if(window.location.href.includes('/index.html')) { // are we on the index (main) page
        console.log('Index page loaded');
        // make a GET request for the post in the database on the server
        fetch('/get_posts',
        {
            method: 'GET',
        }).then(function(response){ //with the response....
            console.error("Status: " + response.status);
            console.error(response);
            return response.json() // return the JSON of the response
        })
        .then(data => processPosts(data))
        .catch(error => console.error(error)); // catch any error and print it out
    }
}

/**
 * Take the post data from the server and process it to display on the webpage
 * @param {JSON} posts The posts data as JSON that will be processed and added to the webpage
 */
function processPosts(posts) { //with the JSON response data
    posts = posts.posts
    //get the posts container from the DOM
    postsContainer = document.getElementById('Posts')
    //TODO: process the response data (Posts) into HTML elements that can be added to our website
    for (var postKey in posts) {
        console.log(posts[postKey])
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

/**
 * function to process the posts from the server and add them to the website
 * @param {string} post_title The title of the post
 * @param {string} post_body The body/content of the post
 * @param {string} post_user The post's user
 * @param {string} post_date The date that the post was posted (as a string) in the dd/mm/yyyy format
 * @returns Return the HTML element for displaying the whole post
 */
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

    //TODO: Make sure you only allow edits to the users own posts
    if (isLoggedIn()) {
        // create options for the post if we in a logged in session
        var div_post_option = document.createElement('div');
        div_post_info.appendChild(div_post_option);
        div_post_option.classList.add('container-center')

        // delete option
        // TODO: add click event handler
        var btn_delete_post = document.createElement('a');
        var fa_delete_post = document.createElement('i');
        
        div_post_option.appendChild(btn_delete_post);
        btn_delete_post.appendChild(fa_delete_post);
        
        btn_delete_post.classList.add('nav-button');
        fa_delete_post.classList.add('fa');
        fa_delete_post.classList.add('fa-trash');
        
        btn_delete_post.href = "#";
        
        // edit option
        // TODO: add click event handler
        var btn_edit_post = document.createElement('a');
        var fa_edit_post = document.createElement('i');
        
        div_post_option.appendChild(btn_edit_post);
        btn_edit_post.appendChild(fa_edit_post);
        
        btn_edit_post.classList.add('nav-button');
        fa_edit_post.classList.add('fa');
        fa_edit_post.classList.add('fa-pencil');

        btn_edit_post.href = "#";
    }
    
    //return the created post html object
    return div_post_container
}

/**
 * Checks is their is a active and valid user session.
 * @returns True if there is a valid and active, logged in user session, else it returns false.
 */
function isLoggedIn() {
    // TODO: check with the server if we are logged in or not

    //return true if we are logged in
    return true;

    // not logged in
    // return false;
}

/**
 * added the login and signup nav buttons to the top nav bar of the site if the user isn't logged in
 */
function addLoginSignupButtons(){
    // <a href="LoginSignup.html" class="nav-button left-aligned LoginSignup"><i class="">Log in</i></a>
    // <a href="LoginSignup.html" class="nav-button left-aligned LoginSignup"><i class="">Sign Up</i></a>
    main_nav = document.getElementById('nav-main');
    
    btn_login = document.createElement('a');
    btn_login_content = document.createElement('i');
    btn_login.appendChild(btn_login_content);
    btn_login_content.textContent = "Log in";
    btn_login.href = "LoginSignup.html";
    btn_login.classList.add('nav-button');
    btn_login.classList.add('left-aligned');
    
    btn_signup = document.createElement('a');
    btn_signup_content = document.createElement('i');
    btn_signup.appendChild(btn_signup_content);
    btn_signup_content.textContent = "Sign Up";
    btn_signup.href = "LoginSignup.html";
    btn_signup.classList.add('nav-button');
    btn_signup.classList.add('left-aligned');

    main_nav.appendChild(btn_login);
    main_nav.appendChild(btn_signup);
}