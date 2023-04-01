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
    .then(function(data) { //with the JSON response data
        console.log(data)
        //TODO: process the response data (Posts) into HTML elements that can be added to our website
    })
    .catch(error => console.error(error)); // catch any error and print it out
}