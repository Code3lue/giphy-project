$(document).ready(function(e) {
  
  var topics = ["basketball", "football", "soccer", "tennis", "baseball", "hockey"]; 
  for (var i = 0; i < topics.length; i++) {
    var sportBtn = $("<button>");
    sportBtn.addClass("btn");
    sportBtn.attr("data-sport", topics[i]);
    sportBtn.text(topics[i]);
    $("#buttons").append(sportBtn);
  };
  });//doc.ready function

$(document).on("click", ".btn", function(e) {
  e.preventDefault();
  $("#gifs").empty();
  var sport = $(this).attr("data-sport");
     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        sport + "&?rating=pg13&api_key=dc6zaTOxFJmzC&limit=10"; //limit of 10 gifs
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;
          for (var i = 0; i < results.length; i++) {
//assigning json item into a variable
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var sportImage = $("<img>");
            // <img>
            sportImage.attr("src", results[i].images.fixed_height_still.url);
            //<img src=''>
            sportImage.attr("data-still", results[i].images.fixed_height_still.url);
            sportImage.attr("data-animate", results[i].images.fixed_height.url);
            sportImage.attr("data-state", "still");
            sportImage.addClass("gif");
            gifDiv.prepend(p);
            //<img src=''> p
            gifDiv.prepend(sportImage);
            $("#gifs").append(gifDiv);
          }
        }); //response function
  });// button click function
  $("#searchBox").on("click", function() {
  $(this).val(" "); 
});
$("#searchSub").on("click", function (e) {
  e.preventDefault();
  var text = $("#searchBox").val().trim();
  submit = $("<button>");
  submit.addClass("btn");
  submit.attr("data-sport", text);
  submit.text(text);
  $("#buttons").append(submit); 
});

  $(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
$(this).attr("data-state", "animate");
      }
      else if (state !== "still") {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
      }  
  }); //doc.gif click function