//create function that return a HTML template for the post
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

    // add the information to the relevant post elements
    h3_post_title.textContent(post_title);
    div_post_user.textContent("Posted by: " + post_user);
    div_post_date.textContent("Date Posted: " + post_date);
    p_post_body.textContent(post_body);


//   <div class="container-posts">
//     <div class="container-center">
//       <h3>
//         <strong>Hats!</strong> The trend this summer is hats for men!
//       </h3>
//       <p>
//         Some text about this blog entry. Fashion fashion and mauris neque
//         quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis
//         nunc id lorem euismod placerat. Vivamus porttitor magna enim, ac
//         accumsan tortor cursus at. Phasellus sed ultricies mi non congue
//         ullam corper. Praesent tincidunt sedtellus ut rutrum. Sed vitae
//         justo condimentum, porta lectus vitae, ultricies congue gravida
//         diam non fringilla.
//       </p>
//     </div>
//     <!-- Post Info (User and data posted) -->
//     <div>
//       <!-- left align the user info -->
//       <div class="left-aligned">Posted by: CatLover231</div>
//       <!-- Right align the date posted info -->
//       <div class="right-aligned">Data Posted: 22/03/2023</div>
//     </div>
//   </div>

        //return the created post html object
        return div_post_container
}


module.exports = { generatePostTemplate };