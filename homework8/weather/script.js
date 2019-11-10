var APIKey = "1b1afd411484586400e59a0b2f0bbe81";
    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +city + APIKey;

    // We then created an AJAX call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Create CODE HERE to Log the queryURL
      // Create CODE HERE to log the resulting object
      console.log(response);
   
    });
