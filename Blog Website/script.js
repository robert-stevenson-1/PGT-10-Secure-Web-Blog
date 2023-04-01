// TODO: Make this function below more specific to its use case
// on index.html load, request the posts form the server
window.onload = function() {
    console.log('Page loaded');
    const response = fetch('/',
    {
        method: 'GET',
    }).then(()=>{
        console.log('Response: ' + response.text)

        // add the response to the DOM
        document.getElementById('Posts').append(response.text)
    })

}