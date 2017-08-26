// $(document).ready(function(){

//   // When you click the savenote button
//   $("#submit-comment").on("click", function() {
   
//    // Grab the id associated with the article from the submit button
//     var thisId = $(this).attr("data-id");
    
//     // Run a POST request to change the note, using what's entered in the inputs
//     $.ajax({
//       method: "POST",
//       url: "/articles/" + thisId,
//       data: {
//         // Value taken from name input
//         name: $("#comment-name").val(),
//         // Value taken from comment body
//         body: $("#comment-body").val()
//       }
//     })
//       // With that done
//       .done(function(data) {
//         // Log the response
//         console.log('RESPONSE', data);
//       });

//     // Also, remove the values entered in the input and textarea for note entry
//     // $("#name").val("");
//     // $("#comment").val("");

//   });



// });