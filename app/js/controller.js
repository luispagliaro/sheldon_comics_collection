$(document).ready(function() {
  var availableComics = [];

  $.each(comics, function(index, comic) {
    $('#comiscCollection').append('<div class=\'comic-item col-xs-6 col-md-3\'><h3><a href=\'#\'>' + comic.name + '</a></h3><span class=\'label label-success\'>' + App.getGenre(comic.idGenre).name + '</span><div class=\'thumbnail\'><img src=\'' + comic.images[0] + '\' /><p class=\'caption\'>' + comic.description + '</p></div></div>');

    availableComics.push(comic.name);
  });

  $('#input-search-comic').autocomplete({
    source: availableComics
  });

  $.each(genres, function(index, genre) {
    $('#dropdown-genre-menu').append('<li><a href=\'#\'>' + genre.name + '</a></li>');
    $('#select-genre').append('<option value=\'' + genre.id + '\'>' + genre.name + '</option>');
  });

  $('#select-genre').append('<option value="add">Add genre</option>');

  $('#select-genre').change(function(e) {
    if ($(this).val() === 'add') {
      $('#select-genre').after("<input type=\"text\" class=\"form-control\" id=\"input-genre\" placeholder=\"Enter genre\" required>");
      $('#select-genre').hide();
    }
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
    height: 585,
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
    var files = $('#input-images')[0].files;
    var images = [];
    var total = files.length;
    var loaded = 0;
    var idGenre = 0;

    for (var i = 0; i < total; i++) {
      readData(files[i]);
    }

    function readData(file) {
      var fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onloadend = function() {
        loaded++;

        var image = fileReader.result;

        images.push(image);

        if (loaded == total) {
          setGenre();
          onAllFilesLoaded();
        }
      };
    }

    function setGenre() {
      if ($('#input-genre').val() !== undefined) {
        var genre = new App.Genre($('#input-genre').val());
        App.setGenre(genre);
        idGenre = genre.id;
      } else {
        idGenre = $('#select-genre option:selected').val();
      }
    }

    function onAllFilesLoaded() {
      var comic = new App.Comic($('#input-name').val(), idGenre, $('#text-description').val(), $('#input-quantity').val(), images, $('#text-videos').val());

      App.setComic(comic);

      window.location.replace('index.html');
    }

    event.preventDefault();
  });
});