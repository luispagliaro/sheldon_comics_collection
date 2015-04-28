'use strict';

var FormComic = {
  addGenre: function() {
    $('#select-genre').append('<option value="add">Add genre</option>');
  },

  selectGenreChange: function() {
    $('#select-genre').change(function() {
      if ($(this).val() === 'add') {
        FormComic.showInputGenre();
      }
    });
  },

  showInputGenre: function() {
    var select = $('#select-genre');

    select.after('<input type="text" class="form-control" id="input-genre" placeholder="Enter genre" maxlength="20" required>');
    select.prop('disabled', false);

    select.prop('disabled', true);
    select.hide();

    select.parent().removeClass('has-success');
    select.parent().removeClass('has-error');

    FormComic.validateGenreExists();
    FormComic.formValidation();
  },

  addGenresToSelect: function() {
    var select = $('#select-genre');
    select.empty();

    if (Controller.genres.length !== 0) {
      select.append('<option value=\'\' disabled>Select an option</option>');

      $.each(Controller.genres, function(index, genre) {
        select.append('<option value=\'' + genre.id + '\'>' + genre.name + '</option>');
      });
    } else {
      FormComic.showInputGenre();
    }

    FormComic.addGenre();
  },

  setFormAddComic: function() {
    $('#form-add-comic').trigger('reset');
    $('#input-genre').prop('disabled', true).hide();
    $('#select-genre').prop('disabled', false).show();
    $('#checkbox-change-image').hide();
    $('label[for=\'checkbox-change-image\']').hide();
    $('#input-images').prop('disabled', false);
    FormComic.addGenresToSelect();
    FormComic.formTitle('Add comic');
    FormComic.cleanValidations();
  },

  setFormModifyComic: function() {
    $('#input-genre').prop('disabled', true).hide();
    $('#select-genre').prop('disabled', false).show();
    $('#checkbox-change-image').prop('checked', false).show();
    $('label[for=\'checkbox-change-image\']').show();
    $('#input-images').prop('disabled', true);
    FormComic.addGenresToSelect();
    FormComic.formTitle('Modify comic');
    FormComic.cleanValidations();
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
        if ($('#select-genre').prop('disabled')) {
          var genre = new Controller.Genre($('#input-genre').val());
          Controller.setGenre(genre);

          return genre.id;
        } else {
          return $('#select-genre option:selected').val();
        }

        Navigation.addGenresToFilterDropdown();
      }

      function onAllFilesLoaded() {
        if ($('#add-comic-label').text() === 'Add comic') {
          var comic = new Controller.Comic($('#input-name').val(), setGenre(), $('#text-description').val().replace(/\n\r?/g, '<br />'), $('#input-quantity').val(), images, $('#text-videos').val());

          Controller.setComic(comic);

          MainContent.showAlert('Comic added successfully.', '#alert-ok');
        } else {
          var comics = Controller.getComics();

          var comic = Controller.getComic($('#input-id').val());

          var index = $.inArray(comic, comics);

          comics[index].name = $('#input-name').val();
          comics[index].idGenre = setGenre();
          comics[index].description = $('#text-description').val().replace(/\n\r?/g, '<br />');
          comics[index].quantity = $('#input-quantity').val();
          comics[index].videos = $('#text-videos').val();

          if ($('#checkbox-change-image').prop('checked')) {
            comics[index].images = images;
          }

          Controller.setComics(comics);

          MainContent.showAlert('Comic modified successfully.', '#alert-ok');
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

  formTitle: function(title) {
    $('#dialog-add-comic #add-comic-label').text(title);
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

  validateComicExists: function() {
    var errorMessage = 'Comic already exists.';
    var hasError = false;

    $('#input-name').on('input change propertychange', function() {
      var comic = Controller.getComicByName($(this).val());

      if ($('#add-comic-label').text() === 'Add comic') {
        if (comic !== undefined) {
          hasError = true;
        }
      }

      if (typeof this.setCustomValidity === 'function') {
        this.setCustomValidity(hasError ? errorMessage : '');
      } else {
        $(this).toggleClass('error', !!hasError);
        $(this).toggleClass('ok', !hasError);
      }
    });
  },

  validateGenreExists: function() {
    var errorMessage = 'Genre already exists.';

    $('#input-genre').on('input change propertychange', function() {
      var genre = Controller.getGenreByName($(this).val());

      if (genre !== undefined) {
        var hasError = true;
      }

      if (typeof this.setCustomValidity === 'function') {
        this.setCustomValidity(hasError ? errorMessage : '');
      }
    });
  },

  validateVideosUrl: function() {
    var errorMessage = 'There is an invalid YouTube URL.';

    $('#text-videos').on('input change propertychange', function() {
      var patternRegex = new RegExp(/^http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/);

      var videos = $('#text-videos').val();

      var lines = videos.split(/\n/);
      var urls = [];
      var errors = 0;
      var hasError = false;

      for (var i = 0; i < lines.length; i++) {
        if (/\S/.test(lines[i])) {
          urls.push($.trim(lines[i]));
        }
      }

      $.each(urls, function(index, url) {
        if (!url.match(patternRegex)) {
          errors++;
        }
      });

      hasError = (errors > 0) ? true : false;

      if (typeof this.setCustomValidity === 'function') {
        this.setCustomValidity(hasError ? errorMessage : '');
      }
    });
  },

  formValidation: function() {
    $('#form-add-comic input, #form-add-comic select, #form-add-comic textarea').each(function(index) {
      var input = $(this);

      input.on('input', function() {
        if (input[0].checkValidity() === false) {
          addStatusClass('#' + input.attr('id'), 'success');
        } else {
          addStatusClass('#' + input.attr('id'), 'error');
        }
      });
    });

    function addStatusClass(el, status) {
      var parent = $(el).parent();

      if (status === 'success') {
        parent.removeClass('has-success').addClass('has-error');
        $(el).next().text($(el)[0].validationMessage);
      } else {
        parent.removeClass('has-error').addClass('has-success');
        $(el).next().text('');
      }
    }
  },

  cleanValidations: function() {
    $('#form-add-comic input, #form-add-comic select, #form-add-comic textarea').each(
      function(index) {
        var input = $(this);

        input.parent().removeClass('has-success');
        input.parent().removeClass('has-error');
      }
    );

    $('#form-add-comic .error').text('');
  },

  init: function() {
    FormComic.addGenresToSelect();
    FormComic.selectGenreChange();
    FormComic.addComic();
    FormComic.imageUploadInput();
    FormComic.validateComicExists();
    FormComic.validateVideosUrl();
    FormComic.formValidation();
  }
};