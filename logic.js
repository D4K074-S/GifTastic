var topics = ["Skateboarding", "Music", "Video Games", "Programming", "Archery"];

function renderButtons() {

    $('#buttons-view').empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

      // Generating buttons for each movie in the array
      var a = $('<button>');
      // Adding a class of topic to our button
      a.addClass('topic btn btn-outline-info');
      // Adding a data-attribute
      a.attr('data-name', topics[i]);
      // Providing the initial button text
      a.text(topics[i]);
      // Adding the button to the buttons-view div
      $('#buttons-view').append(a);

      a.on('click', function (){
        var topic= $(this).attr('data-name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=87fUMW1SGqF7lZH0BdAHZEJC4CnG0sHq&limit=10&rating=g";
    
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data;
    
            for (var i = 0; i < results.length; i++) {
              var gifDiv = $('<div>');
    
              var rating = results[i].rating;
    
              var p = $('<p>').text("Rating: " + rating);
    
              var topicImage = $('<img>');
              topicImage.attr("src", results[i].images.fixed_height.url);
    
              gifDiv.prepend(p);
              gifDiv.prepend(topicImage);
    
              $('#topic-view').prepend(gifDiv);
            }
        });
          
      });
    }
}
//Function events where one button is clicked
$('#add-topic').on('click', function(event) {
    event.preventDefault();

    // Grabbing the input from the textbox
    var topic = $('#topic-input').val().trim();
    if (topic){
        topics.push(topic);
    }

    $('#topic-input').val("");

    // Calling renderButtons which handles the processing of our topic array
    renderButtons();
});
// Calling the renderButtons function to display the intial buttons
renderButtons();