var button = $("#button");
var textArea = $("#burgerName");
var beforeDisplay = $("#beforeDiv");
var beforeBtn = $("#buttonsDiv");
var afterDisplay = $("#afterDiv");
// when the submit button is clicked
if(localStorage.getItem("Burgers")){
    var offlineBurgers = JSON.parse(localStorage.getItem("Burgers"));
    if (navigator.onLine) {
        for(i = 0; i < offlineBurgers.length; i++){
            newBurger(offlineBurgers[i]);
        }
        localStorage.clear();
    }
}
else{
    var offlineBurgers = [];
}

button.on("click", function () {
    var burgerName = textArea.val();
    textArea.val("");
    if (navigator.onLine) {
        newBurger(burgerName);
    }
    else{
        offlineBurgers.push(burgerName);
        localStorage.setItem("Burgers" ,JSON.stringify(offlineBurgers));
        offlineList();
    }
    
});
// when the devoused button is click
beforeBtn.on("click", ".buttons", function () {
    var burgerId = $(this).attr("burgerid");

    updatingDevoure(burgerId);
});
// a post call that will add a new burger name to the database using api
function newBurger(burgerName) {
    var burger = {
        name: burgerName
    }
    $.ajax("/api/burger", {
        type: "POST",
        data: burger
    }).then(function (res) {

        getBurger();
    });
}
// api call to get all information about burgers
function getBurger() {
    $.ajax("/api/burger", {
        type: "GET"
    }).then(function (res) {
        displayBurgers(res);
    })
}
// display information from the api to user
function displayBurgers(burgers) {
    beforeBtn.html("");
    beforeDisplay.html("");
    afterDisplay.html("");
    for (i = 0; i < burgers.length; i++) {
        var newDiv = $("<div>");
        newDiv.html(burgers[i].id + ". " + burgers[i].burger_name);
        newDiv.addClass("burgertags");
        if (burgers[i].devoured) {

            afterDisplay.append(newDiv);
        }
        else {
            beforeDisplay.append(newDiv);
            var newBtn = $("<button>");
            newBtn.text("Devour!");
            newBtn.attr("burgerid", burgers[i].id);
            newBtn.addClass("btn btn-danger buttons");
            beforeBtn.append(newBtn);
        }
    }
}
// this will change devoured to true in db
function updatingDevoure(id) {
    $.ajax({
        url: "/api/burger/" + id,
        type: "PUT"
    }).then(function (res) {
        beforeBtn.html("");
        beforeDisplay.html("");
        afterDisplay.html("");
        getBurger();
    });
}

function offlineList(){
    var offlineListBox = $("#offlineList");
    offlineListBox.html("");
    for(i=0; i < offlineBurgers.length; i++){
        var list = $("<li>");
        list.html(offlineBurgers[i]);
        offlineListBox.append(list);
    }

}
// getBurger when the page is done loading
$(document).ready(function () {
    if (navigator.onLine) {
        getBurger();
    }
});