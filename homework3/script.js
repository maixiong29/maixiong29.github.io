var generate = document.getElementById("generate");
var copy = document.getElementById("copy");
var numeric = "1234567890";
var special = "~!@#$%^&*()_+";
var lower = "qwertyuiopasdfghjklzxcvbnm";
var upper = "QWERTYUIOPLKJHGFDSAZXCVBNM";
var master = "";
var password = "";

generate.addEventListener("click", function () {
   var userLength = parseInt(prompt("How many characters would you like your password to contain?"));
   // for (i = 0; i < keyList.length; i++) {
   //     text += cars[i] + "<br>";
   //   }
   if (userLength < 8 || userLength > 128){
     alert ("Enter between 8-128 characters")
   }
   else{
     var userSpecial = confirm ("Click OK to confirm including special characters.");
     var userNumber = confirm ("Click OK to confirm including numeric characters.");
     var userLower = confirm ("Click OK to confirm including lowercase characters.");
     var userUpper = confirm ("Click OK to confirm including uppercase characters.");
   };

     if (userSpecial){
     master = master + special;
     }
     if (userNumber){
     master = master + numeric;
     }
     if (userLower){
     master = master + lower;
     }
     if (userUpper){
     master = master + upper;
    };
for (var i = 0; i < userLength; i ++){
password = password + master.charAt(Math.floor(Math.random() * Math.floor(master.length)));
}

document.getElementById("password").value = password;
})

copy.addEventListener("click", function(){
    document.getElementById("password").select();
    document.execCommand("Copy");
    alert("Password has been copied");
})