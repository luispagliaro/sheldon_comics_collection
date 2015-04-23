'use strict';

var FormComic = {
  addGenre: function() {
    $('#select-genre').append('<option value="add">Add genre</option>');
  },

  selectGenreChange: function() {
    $('#select-genre').change(function() {
      if ($(this).val() === 'add') {
        $('#select-genre').after('<input type="text" class="form-control" id="input-genre" placeholder="Enter genre" required>');
        $('#input-genre').prop('disabled', false);

        $('#select-genre').prop('disabled', true);
        $('#select-genre').hide();
      }
    });
  },

  addGenresToSelect: function() {
    if (Controller.genres.length !== 0) {
      $('#select-genre').empty();

      $('#select-genre').append('<option value=\'\' disabled>Select an option</option>');

      $.each(Controller.genres, function(index, genre) {
        $('#select-genre').append('<option value=\'' + genre.id + '\'>' + genre.name + '</option>');
      });
    }

    FormComic.addGenre();
  },

  setFormAddComic: function() {
    $('#form-add-comic').trigger('reset');
    $('#input-genre').prop('disabled', true);
    $('#input-genre').hide();
    $('#select-genre').prop('disabled', false);
    $('#select-genre').show();
    $('#checkbox-change-image').hide();
    $('label[for=\'checkbox-change-image\']').hide();
    $('#input-images').prop('disabled', false);
    FormComic.addGenresToSelect();
  },

  setFormModifyComic: function() {
    $('#input-genre').prop('disabled', true);
    $('#input-genre').hide();
    $('#select-genre').prop('disabled', false);
    $('#select-genre').show();
    $('#checkbox-change-image').show();
    $('label[for=\'checkbox-change-image\']').show();
    $('#input-images').prop('disabled', true);
    FormComic.addGenresToSelect();
  },

  addComic: function() {
    $('#form-add-comic').submit(function(event) {
      event.preventDefault();

      var files = $('#input-images')[0].files;
      var images = [];
      var total = files.length;
      var loaded = 0;

      function readImages() {
        for (var i = 0; i < total; i++) {
          readData(files[i]);
        }
      }

      function readData(file) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onloadend = function() {
          loaded++;

          var image = fileReader.result;

          images.push(image);

          if (loaded == total) {
            onAllFilesLoaded();
          }
        };
      }

      function setGenre() {
        if ($('#input-genre').val() !== undefined) {
          var genre = new Controller.Genre($('#input-genre').val());
          Controller.setGenre(genre);

          return genre.id;
        } else {
          return $('#select-genre option:selected').val();
        }
      }

      function onAllFilesLoaded() {
        if ($('#add-comic-label').text() === 'Add comic') {
          var comic = new Controller.Comic($('#input-name').val(), setGenre(), $('#text-description').val(), $('#input-quantity').val(), images, $('#text-videos').val());

          Controller.setComic(comic);
        } else {
          var comics = Controller.getComics();

          var index = $('#input-id').val() - 1;

          comics[index].name = $('#input-name').val();
          comics[index].idGenre = setGenre();
          comics[index].description = $('#text-description').val();
          comics[index].quantity = $('#input-quantity').val();
          comics[index].videos = $('#text-videos').val();

          if ($('#checkbox-change-image').prop('checked')) {
            comics[index].images = images;
          }

          Controller.setComics(comics);
        }
        $('#dialog-add-comic').modal('toggle');

        MainContent.loadComics();
      }

      if ($('#add-comic-label').text() === 'Add comic') {
        readImages();
      } else {
        if ($('#checkbox-change-image').prop('checked')) {
          readImages();
        } else {
          onAllFilesLoaded();
        }
      }
    });
  },

  loadComicData: function(id, name, idGenre, description, quantity, videos) {
    $('#input-id').val(id);
    $('#input-name').val(name);
    $('#select-genre').val(idGenre);
    $('#text-description').val(description);
    $('#input-quantity').val(quantity);
    $('#text-videos').val(videos);
  },

  formTitle: function() {
    $('#button-add-comic').on('click', function() {
      $('#dialog-add-comic #add-comic-label').text('Add comic');
    });
    $('.glyphicon-edit').on('click', function() {
      $('#dialog-add-comic #add-comic-label').text('Modify comic');
    });
  },

  imageUploadInput: function() {
    $('#checkbox-change-image').change(function() {
      if ($(this).prop('checked')) {
        $('#input-images').prop('disabled', false);
      } else {
        $('#input-images').prop('disabled', true);
      }
    });
  },

  init: function() {
    FormComic.addGenresToSelect();
    FormComic.selectGenreChange();
    FormComic.addComic();
    FormComic.formTitle();
    FormComic.imageUploadInput();
  }
};