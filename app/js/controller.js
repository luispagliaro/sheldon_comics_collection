$(document).ready(function() {
  $.each(comics, function(index, comic) {
    $("#comiscCollection").append("<div class=\"col-xs-6 col-md-3\"><h4>" + comic.name + "</h4><a href=\"#\" class=\"thumbnail\"></a></div>");
  });
});