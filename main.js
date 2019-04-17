$(document).ready(function() {
    $.ajax("/api/articles").then(function(response) {
        console.log(response)
    }) 
});