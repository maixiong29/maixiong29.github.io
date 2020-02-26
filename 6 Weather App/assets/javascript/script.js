var apiKey = "b090192947ebb72ee8d89e585110389e"
var savedCities = [];
var city

function searchCity() {
   
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&apikey=" + apiKey;

    console.log(queryURL);
 
    $.ajax({      
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(queryURL);

        var iconCode = response.weather[0].icon;
        var weatherIconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";

        $(".city").html("<h3>" + response.name + "<br/>" + moment().format('L' + "</h3>"));
        $(".temperature").html("<strong>Temperature:</strong> " + ((response.main.temp - 273.15) * 1.80 + 32).toFixed(1) + " degrees Fahrenheit");
        $(".humidity").html("<strong>Humidity:</strong> " + response.main.humidity + "%");
        $(".wind").html("<strong>Wind Speed:</strong> " + response.wind.speed + " mph");
        $(".icon").attr('src', weatherIconURL).attr('alt', 'weather icon');

        var uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&apikey=" + apiKey;

        $.ajax({        
            url: uvIndexURL,
            method: "GET"
        }).then(function (response) {
            $(".uv").html("<strong>UV Index:</strong> " + response.value);

            var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&apikey=" + apiKey;

            $.ajax({    
                url: forecastURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);

                $(".forecast").empty();

                for (var i = 0; i < 5; i++) {
                    var newDiv = $("<div>").attr('id', i).addClass("bg-primary p-1 m-1");
                    var newRow = $("<div>").addClass("next-line" + [i]);
                    var forecastTemp = $("<div>").addClass("text-white");
                    var forecastHumidity = $("<div>").addClass("text-white");
                    iconCode = response.list[i].weather[0].icon;
                    iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";
                    iconDiv = $("<img>").attr('src', iconURL).attr('alt', "forecast weather symbol");
                    newDiv.html(moment().add((i + 1), 'days').format('L')).addClass("text-white");
                    $(".forecast").append(newDiv);
                    $(newDiv).append(newRow);
                    $(forecastTemp).html("Temp: " + ((response.list[i].main.temp - 273.15) * 1.8 + 32).toFixed(1) + "° F");
                    $(forecastHumidity).html("Humidity: " + response.list[i].main.humidity + "%");
                    $(".next-line" + i).append(iconDiv);
                    $("#" + i).append(forecastTemp);
                    $("#" + i).append(forecastHumidity);

                }
            })
        })
    })
};

//Adds searched cities as a button that stores into local storage.
function addWBtn() {
    var city = $("#city-search").val().trim();
    var list = $("<button>");
    list.addClass("btn btn-secondary p-1 m-1 city-btn");
    list.html(city);
    $("#cityBtns").append(list);
    savedCities.push(city);
    localStorage.setItem('searchedCities', JSON.stringify(savedCities));
}

//On document ready, retrieve cities in local storage, loop through them, and create buttons.
$(document).ready(function () {
    savedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];

    for (i = 0; i < savedCities.length; i++) {
        var savedBtn = $("<button>");
        savedBtn.addClass("btn btn-secondary p-1 m-1 city-btn").html(savedCities[i]);
        $("#cityBtns").append(savedBtn);
    }
})

$("#searchBtn").on("click", function(event){
    event.preventDefault;
    city = $("#city-search").val().trim();
    searchCity();
    addWBtn();
})

$(document).on("click", ".city-btn", function(event){
    event.preventDefault();
    console.log($(this));
    city = $(this).text();
    searchCity();
})