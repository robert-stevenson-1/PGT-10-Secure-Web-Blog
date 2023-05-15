// === set the events ===
window.onload = onload();

const formSearch = document.getElementById("formSearch");
const inputSearch = document.getElementById("searchBar");
// const btnSearch = document.getElementById('searchBtn');
// when ever the search bar is typed in then run event
inputSearch.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        console.log(location.href);
        searchPosts();
    }
});

/**
 * On the page load, run...
 */
async function onload() {
    console.log("Page loaded");
    console.log(window.location.href);

    if (!isLoggedIn()) {
        addLoginSignupButtons();
    } else {
        addExtraNav();
    }

    // check if what page we are on
    if (window.location.href.includes("/posts.html")) {
        // are we on the posts page
        console.log("Index page loaded");
        // make a GET request for the post in the database on the server
        fetch("/getPosts", {
            method: "GET",
        })
            .then(function (response) {
                //with the response....
                console.log("Status: " + response.status);
                console.log(response);
                return response.json(); // return the JSON of the response
            })
            .then((data) => processPosts(data))
            .catch((error) => console.error(error)); // catch any error and print it out
    }

    if (window.location.href.includes("/Search.html")) {
        // are we on the search page
        // get the search from sessionStorage (ref: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)
        let searchResult = sessionStorage.getItem("searchResult");
        //parse the data string from sessionStorage as JSON again
        searchResult = JSON.parse(searchResult);
        console.log(searchResult);
        // process and display the results
        await processPosts(searchResult); // the result here are posts
        // remove the results from storage
        sessionStorage.removeItem("searchResult");
    }
}

/**
 * Take the post data from the server and process it to display on the webpage
 * @param {JSON} posts The posts data as JSON that will be processed and added to the webpage
 */
function processPosts(posts) {
    //with the JSON response data
    posts = posts.posts;
    //get the posts container from the DOM
    postsContainer = document.getElementById("Posts");
    if (!postsContainer) {
        throw new Error("Can not find posts container");
    }
    //TODO: process the response data (Posts) into HTML elements that can be added to our website
    for (var postKey in posts) {
        console.log(posts[postKey]);
        //create a new post element
        postElement = generatePostTemplate(
            posts[postKey].postTitle,
            posts[postKey].postBody,
            posts[postKey].user,
            posts[postKey].datePost
        );
        //add it to the Page
        postsContainer.appendChild(postElement);
    }
}

async function searchPosts() {
    console.log(inputSearch);

    //data to send
    let val = inputSearch.value;
    // check for presence of value and is larger than 0
    if (val && val.trim().length > 0) {
        // trim makes sure to cut off any tailing whitespace
        val = val.trim(); // trim the tailing whitespace
        val = val.toLowerCase(); // reduce all the characters to lowercase representation where possible
        // data = {
        //     "search": val,
        // };
        // console.log(JSON.stringify(data));

        //written with the aid of: https://www.digitalocean.com/community/tutorials/use-expressjs-to-get-url-and-post-parameters
        fetch(`/Search?search=${val}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(function (response) {
                //with the response....
                console.log("Status: " + response.status);
                console.log(response);
                return response.json(); // return the JSON of the response
            })
            .then(function (data) {
                // store the search results in session storage so that we can use it in the search.html page
                // Reference: https://www.w3schools.com/HTML/html5_webstorage.asp
                console.log(data);
                //store the JSON data as a string in sessionStorage
                sessionStorage.setItem("searchResult", JSON.stringify(data));
            })
            .then(function () {
                // redirect to search page
                window.location.href = "/Search.html";
            })
            .catch((error) => console.error(error)); // catch any error and print it out
    }
}

/**
 * function to process the posts from the server and add them to the website
 * @param {string} postTitle The title of the post
 * @param {string} postBody The body/content of the post
 * @param {string} postUser The post's user
 * @param {string} postDate The date that the post was posted (as a string) in the dd/mm/yyyy format
 * @returns Return the HTML element for displaying the whole post
 */
function generatePostTemplate(postTitle, postBody, postUser, postDate) {
    // create the container of the post
    var divPostContainer = document.createElement("div");
    var divCenter = document.createElement("div"); // container for centering the post
    var h3PostTitle = document.createElement("h3");
    var pPostBody = document.createElement("p");
    var divPostInfo = document.createElement("div");
    var divPostUser = document.createElement("div");
    var divPostDate = document.createElement("div");

    // structure all the post's elements
    divPostContainer.appendChild(divCenter);
    divPostContainer.appendChild(divPostInfo);

    divCenter.appendChild(h3PostTitle);
    divCenter.appendChild(pPostBody);

    divPostInfo.appendChild(divPostUser);
    divPostInfo.appendChild(divPostDate);

    //add the style tags to the HTML elements
    divPostContainer.classList.add("container-posts");

    divCenter.classList.add("container-center");

    divPostUser.classList.add("left-aligned");
    divPostDate.classList.add("right-aligned");

    // add the information to the relevant post elements
    h3PostTitle.textContent = postTitle;
    divPostUser.textContent = "Posted by: " + postUser;
    divPostDate.textContent = "Date Posted: " + postDate;
    pPostBody.textContent = postBody;

    //TODO: Make sure you only allow edits to the users own posts
    if (isLoggedIn()) {
        // create options for the post if we in a logged in session
        var divPostOption = document.createElement("div");
        divPostInfo.appendChild(divPostOption);
        divPostOption.classList.add("container-center");

        // delete option
        // TODO: add click event handler
        var btnDeletePost = document.createElement("a");
        var faDeletePost = document.createElement("i");

        divPostOption.appendChild(btnDeletePost);
        btnDeletePost.appendChild(faDeletePost);

        btnDeletePost.classList.add("nav-button");
        faDeletePost.classList.add("fa");
        faDeletePost.classList.add("fa-trash");

        btnDeletePost.href = "#";

        // edit option
        // TODO: add click event handler
        var btnEditPost = document.createElement("a");
        var faEditPost = document.createElement("i");

        divPostOption.appendChild(btnEditPost);
        btnEditPost.appendChild(faEditPost);

        btnEditPost.classList.add("nav-button");
        faEditPost.classList.add("fa");
        faEditPost.classList.add("fa-pencil");

        btnEditPost.href = "#";
    }

    //return the created post html object
    return divPostContainer;
}

/**
 * Checks is their is a active and valid user session.
 * @returns True if there is a valid and active, logged in user session, else it returns false.
 */
function isLoggedIn() {
    // TODO: check with the server if we are logged in or not

    //return true if we are logged in
    // return true;

    // not logged in
    return false;
}

/**
 * added the login and signup nav buttons to the top nav bar of the site if the user isn't logged in
 */
function addLoginSignupButtons() {
    // <a href="LoginSignup.html" class="nav-button left-aligned LoginSignup"><i class="">Log in</i></a>
    // <a href="LoginSignup.html" class="nav-button left-aligned LoginSignup"><i class="">Sign Up</i></a>
    mainNav = document.getElementById("nav-main");

    btnLogin = document.createElement("a");
    btnLoginContent = document.createElement("i");
    btnLogin.appendChild(btnLoginContent);
    btnLoginContent.textContent = "Log in";
    btnLogin.href = "Index.html";
    btnLogin.classList.add("nav-button");
    btnLogin.classList.add("left-aligned");

    // btnSignup = document.createElement("a");
    // btnSignupContent = document.createElement("i");
    // btnSignup.appendChild(btnSignupContent);
    // btnSignupContent.textContent = "Sign Up";
    // btnSignup.href = "signup.html";
    // btnSignup.classList.add("nav-button");
    // btnSignup.classList.add("left-aligned");

    // mainNav.appendChild(btnLogin);
    // mainNav.appendChild(btnSignup);
}

// function addExtraNav() {
//     mainNav = document.getElementById("nav-main");

//     btnLogOut = document.createElement("a");
//     btnLogOutContent = document.createElement("i");
//     btnLogOut.appendChild(btnLogOutContent);
//     btnLogOutContent.textContent = "Log in";
//     btnLogOut.href = "LoginSignup.html";
//     btnLogOut.classList.add("nav-button");
//     btnLogOut.classList.add("left-aligned");

//     btnViewPost = document.createElement("a");
//     btnViewPostContent = document.createElement("i");
//     btnViewPost.appendChild(btnViewPostContent);
//     btnViewPostContent.textContent = "View Posts";
//     btnViewPost.href = "posts.html";
//     btnViewPost.classList.add("nav-button");
//     btnViewPost.classList.add("left-aligned");

//     mainNav.appendChild(btnViewPost);
// }




// Login code:

let waitForVerifyResolve;
let boolVerified = false;

const form = document.getElementById("loginForm");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

const usernameDiv = document.getElementById("username");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    const responseDiv = document.getElementById("response");
    console.log(responseDiv);

    // show the popup for the code and wait for the user to provide the verification code code
    // method inspiration: https://stackoverflow.com/questions/65915371/how-do-i-make-the-program-wait-for-a-button-click-to-go-to-the-next-loop-iterati
    await showCodePopup();
    // request a verification to be sent via email
    const ver_resp = await fetch("/send_verify_code",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username
}),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });

    // wait for the verification popup for to be completed or closed
    await waitForVerify();

    if (!boolVerified) {
        console.log("NOT Verified, POST login");
        // Display an error message for failed login
        const error = document.querySelector("#error");
        responseDiv.innerText = "Wrong username or password.";
        return;
    }

    console.log("Verified, POST login");

    const response = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // Redirect to the home page
                window.location.href = "/posts.html";
                responseDiv.innerText = "Login successful!";
            } else {
                // Display an error message
                const error = document.querySelector("#error");
                responseDiv.innerText = "Wrong username or password.";
                error.textContent = data.message;
            }
        })
        .catch((error) => console.error(error));
});

// LOGIN 2FA

let btnCodeSubmit;
let btnCodeClose;

function waitForVerify() {
    return new Promise(resolve => waitForVerifyResolve = resolve);
}

async function showCodePopup() {
    await drawCodePopup();
    btnCodeSubmit = document.getElementById("btnCodeSubmit");
    btnCodeClose = document.getElementById("btnCodeClose");

    // set the submit code event on the click
    btnCodeSubmit.addEventListener("click", verifyCode)
    // set the close code event on the click
    btnCodeClose.addEventListener("click", closeCodePopup);

    document.getElementById("validationCodePopup").style.display = "Block";
}

async function verifyCode(){
    //get the submitted code
    let ver_code = document.getElementById("code").value;
    
    //get the username
    const username = usernameInput.value;

    //TODO: send the code entered to the server to verify with.
    let ver_response = await fetch("/verify_code",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, ver_code}),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                console.log("verify success")
                boolVerified = true;
            } else {
                console.log("verify failed")
                boolVerified = false;
            }
        })
        .catch((error) => console.error(error));



    document.getElementById("valCodePopup").remove(); // remove the popup form
    // do what need to be done before resolving the wait promise
    if (waitForVerifyResolve) waitForVerifyResolve(); // resolve the promise
}

function closeCodePopup() {
    console.log("closeCodePopup");

    boolVerified = false;    
    
    document.getElementById("valCodePopup").remove(); // remove the popup form
    
    // do what need to be done before resolving the wait promise
    if (waitForVerifyResolve) waitForVerifyResolve(); // resolve the promise
}

function drawCodePopup() {
    let popupDiv = document.createElement("div");
    popupDiv.classList.add("valCodePopup");
    popupDiv.id = "valCodePopup";

    popupDiv.innerHTML = "<div class=\"formPopup\" id=\"validationCodePopup\"><form class=\"formContainer\"><h2>Validation code</h2><label for=\"code\"><strong>Code:</strong></label><input type=\"text\" id=\"code\" name=\"code\" required><button type=\"button\" class=\"btn\" id=\"btnCodeSubmit\">Submit</button><button type=\"button\" class=\"btn cancel\" id=\"btnCodeClose\">Close</button></form></div>";

    document.getElementById("main").append(popupDiv);  

    btnCodeSubmit = document.getElementById("btnCodeSubmit");
    btnCodeClose = document.getElementById("btnCodeClose");
}

function hideCodePopup() {
    document.getElementById("validationCodePopup").style.display = "none";
}

//signup form code
const signupForm = document.getElementById("Signup");
const signupUsernameInput = document.querySelector("#usernameinput");
const signupPasswordInput = document.querySelector("#psw");
const signupRepeatPasswordInput = document.querySelector("#psw-repeat");
const signupEmail = document.querySelector("#email");

signupForm.addEventListener("submit", async (event) => {
    console.log(
        "neredeyiz",
        signupPasswordInput.value,
        signupRepeatPasswordInput.value
    );
    event.preventDefault();
    const username = signupUsernameInput.value;
    const password = signupPasswordInput.value;
    const repeatpassword = signupRepeatPasswordInput.value;
    const email = signupEmail.value;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+-={[}\]|\\:;"'<,>.?/])(?!.*\s).{8,}$/;
    if (!emailRegex.test(email)) {
        console.log("Invalid email address");
        return;
    }
    if (!passwordRegex.test(password)) {
        console.log("Invalid password ");
        return;
    }
    if (password !== repeatpassword) {
        console.log("Password doesn't match");
        return;
    }
    const responseDiv = document.getElementById("response");
    console.log(responseDiv);
    const response = await fetch("/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // Redirect to the home page
                window.location.href = "/posts.html";
                responseDiv.innerText = "Signup successful!";
            } else {
                // Display an error message
                const error = document.querySelector("#error");
                error.textContent = data.message;
            }
        })
        .catch((error) => console.error(error));
});

function logout() {
    fetch("/logout", { method: "POST" })
        .then((response) => {
            if (response.ok) {
                alert("Successful logged out!");
                location.reload();
            } else {
                alert("An error occurs while logging out!");
            }
        })
        .catch((error) => {
            console.log(error);
            alert("An error occurs while logging out!");
        });
}
