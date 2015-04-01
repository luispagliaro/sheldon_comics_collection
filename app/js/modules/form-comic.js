'use strict';

var FormComic = {
  dialog: {
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
  },

  setDialog: function() {
    $('#dialog-add-comic').dialog(FormComic.dialog);
  },

  addGenre: function() {
    $('#select-genre').append('<option value=\'add\'>Add genre</option>');

    $('#select-genre').change(function() {
      if ($(this).val() === 'add') {
        $('#select-genre').after('<input type=\'text\' class=\'form-control\' id=\'input-genre\' placeholder=\'Enter genre\' required>');
        $('#select-genre').hide();
      }
    });
  },

  addComic: function() {
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
  },

  init: function() {
    FormComic.setDialog();
    FormComic.addGenre();
    FormComic.addComic();
  }
};