//Displays current day.

var today = moment().format('dddd, MMMM Do YYYY');
$("#currentDay").text(today);
console.log(today);

//Assigns each time block a color in relation to the current time of day.

for (var i = 9; i < 18; i++) {
    if (i < moment().hour()) {
        $("#" + i).addClass("past")
    }
    else if (i === moment().hour()){
        $("#" + i).addClass("present")
    }
    else {
        $("#" + i).addClass("future")
    }
}

//Saving timeblock inputs into local storage, and reloading them on refresh.

$("button").on("click", function (event) {
    event.preventDefault();
    var savedText = $("textarea#" + this.id).val();
    localStorage.setItem("plannedEvent" + this.id, savedText)
});

$(document).ready(function () {
    for (i = 9; i < 18; i++) {
        var savedText = localStorage.getItem("plannedEvent" + i);
        $("textarea#" + i).html(savedText);
    }
});