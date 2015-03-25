$(document).ready(function() {
  $.each(comics, function(index, comic) {
    $("#comiscCollection").append("<div class=\"col-xs-6 col-md-3\"><h4>" + comic.name + "</h4><a href=\"#\" class=\"thumbnail\"></a></div>");
  });
  $.each(genres, function(index, genre) {
    $("#dropdown-genre-menu").append("<li><a href=\"#\">" + genre.name + "</a></li>");
    $("#genre").append("<option value=\"" + genre.id + "\">" + genre.name + "</option>");
  });

  var dialog = {
    modal: true,
    width: 400,
    height: 565,
    position: {
      my: 'center',
      at: 'center',
      of: window
    },
    resizable: false,
    draggable: false,
    closeOnEscape: true,
    show: 'fade',
    hide: 'fade',
    autoOpen: false,
    sticky: true
  };
  $("#dialog-add-comic").dialog(dialog);

  $("#form-add-comic").submit(function(event) {
    var comic = new App.Comic($('#name').val(), $('#genre option:selected').val(), $('#description').val(), $('#quantity').val());

    App.setComic(comic);
    
    event.preventDefault();

    window.location.replace("index.html");
  });
});