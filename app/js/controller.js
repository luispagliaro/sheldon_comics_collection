$(document).ready(function() {
  var availableComics = [];

  $.each(comics, function(index, comic) {
    $('#comiscCollection').append('<div class=\'comic-item col-xs-6 col-md-3\'><h3><a href=\'#\'>' + comic.name + '</a></h3><span class=\'label label-success\'>' + comic.genre + '</span><div class=\'thumbnail\'><img src=\'' + comic.image[0] + '\' /><p class=\'caption\'>' + comic.description + '</p></div></div>');

    availableComics.push(comic.name);
  });

  $('#input-search-comic').autocomplete({
    source: availableComics
  });

  $.each(genres, function(index, genre) {
    $('#dropdown-genre-menu').append('<li><a href=\'#\'>' + genre.name + '</a></li>');
    $('#genre').append('<option value=\'' + genre.id + '\'>' + genre.name + '</option>');
  });

  $('#dropdown-genre-menu li').click(function(e) {
    if ($(this).text() === 'Show all') {
      $('#comiscCollection .comic-item').show(500);
    } else {
      $('#comiscCollection .comic-item').show(500);
      $('#comiscCollection .comic-item:not(:contains(' + $(this).text() + '))').hide(500);
    }
  });

  var dialog = {
    modal: true,
    width: 320,
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
  $('#dialog-add-comic').dialog(dialog);

  $('#form-add-comic').submit(function(event) {
    var files = $('#images')[0].files;
    var images = [];
    var total = files.length;
    var loaded = 0;

    for (var i = 0; i < total; i++) {
      readData(files[i]);
    }

    function readData(file) {
      alert(file);
      var fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onloadend = function() {
        loaded++;

        var image = fileReader.result;

        alert(image);

        images.push(image);

        if (loaded == total) {
          onAllFilesLoaded();
        }
      };
    }

    function onAllFilesLoaded() {
      var comic = new App.Comic($('#name').val(), $('#genre option:selected').val(), $('#description').val(), $('#quantity').val(), images);

      App.setComic(comic);

      window.location.replace('index.html');
    }

    event.preventDefault();
  });
});