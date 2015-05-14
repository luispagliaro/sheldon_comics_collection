'use strict';

/**
 * Module containing all functionality related to the form for adding/modifying comics.
 * @type {Object}
 */
var FormComic = {
  /**
   * Adds the event 'change' to the select 'select-genre' element.
   */
  selectGenreChange: function() {
    $('#select-genre').change(function() {
      // If the value of the option selected equals 'add', the 'showInputGenre' function is called.
      if ($(this).val() === 'add') {
        FormComic.showInputGenre();
      }
    });
  },

  /**
   * Hides the select 'select-genre' element and shows the input 'input-genre' element.
   */
  showInputGenre: function() {
    /** @type {Object} Select 'select-genre' element */
    var select = $('#select-genre');

    // Removes any previously remaining state.
    select.parent().removeClass('has-success');
    select.parent().removeClass('has-error');

    // Disables the select 'select-genre' element.
    select.prop('disabled', true);

    // Hides the select 'select-genre' element 
    select.hide();

    /** @type {Object} Input 'input-genre' element */
    var input = $('#input-genre');

    // Enables the input 'input-genre' element.
    input.prop('disabled', false);

    // Clear the input 'input-genre' element.
    input.empty();

    // Shows the input 'input-genre' element.
    input.show();

    // Removes any previously remaining state
    input.parent().removeClass('has-success');
    input.parent().removeClass('has-error');

    // Calls 'validateGenreExists' function to add custom validation events.
    FormComic.validateGenreExists();

    // Calls 'formValidation' function to add custom validation events.
    FormComic.formValidation();
  },

  /**
   * Adds the 'Add genre' option in the select 'select-genre' element.
   */
  addGenre: function() {
    $('#select-genre').append('<option value="add">Add genre</option>');
  },

  /**
   * Adds genres to select 'select-genre' element.
   */
  addGenresToSelect: function() {
    /** @type {Object} Select element */
    var select = $('#select-genre');

    // Removes previously loaded genres.
    select.empty();

    // Checks if there are genres added.
    if (Controller.genres.length !== 0) {
      // Adds the default option 'Select an option'. to the select 'select-genre' element.
      select.append('<option value=\'\' disabled>Select an option</option>');

      /**
       * Adds all the genres as options for the select 'select-genre' element.
       */
      $.each(Controller.genres, function(index, genre) {
        select.append('<option value=\'' + genre.id + '\'>' + genre.name + '</option>');
      });

      // Calls the 'addGenre' function to add the addGenre option to the select 'select-genre' element.
      FormComic.addGenre();
    } else {
      // If there are no genres added calls the 'showInputGenre' function to show the input 'input-genre' element.
      FormComic.showInputGenre();
    }
  },

  /**
   * Sets the title of the form.
   * @param  {String} title Title of the form.
   */
  formTitle: function(title) {
    $('#dialog-add-comic #add-comic-label').text(title);
  },

  /**
   * Sets the settings for the form when adding a comic.
   */
  setFormAddComic: function() {
    // Reset all the fields in the form.
    $('#form-add-comic').trigger('reset');

    // Disables and hides the input 'input-genre' element.
    $('#input-genre').prop('disabled', true).hide();

    // Enables and shows the select 'select-genre' element.
    $('#select-genre').prop('disabled', false).show();

    // Hides the input 'checkbox-change-image' element.
    $('#checkbox-change-image').hide();

    // Hides the label for the input 'checkbox-change-image' element.
    $('label[for=\'checkbox-change-image\']').hide();

    // Enables the input 'input-images' element.
    $('#input-images').prop('disabled', false);

    // Adds the genres to the select 'select-genre' element.
    FormComic.addGenresToSelect();

    // Adds the title 'Add comic' to the form.
    FormComic.formTitle('Add comic');

    // Removes any previous validation.
    FormComic.cleanValidations();
  },

  /**
   * Sets the settings for the form when modifying a comic.
   */
  setFormModifyComic: function() {
    // Disables and hides the input 'input-genre' element.
    $('#input-genre').prop('disabled', true).hide();

    // Enables and shows the select 'select-genre' element.
    $('#select-genre').prop('disabled', false).show();

    // Shows and unchecks the input 'checkbox-change-image' element.
    $('#checkbox-change-image').prop('checked', false).show();

    // Shows the label for the input 'checkbox-change-image' element.
    $('label[for=\'checkbox-change-image\']').show();

    // Disables the input 'input-images' element.
    $('#input-images').prop('disabled', true);

    // Adds the genres to the select 'select-genre' element.
    FormComic.addGenresToSelect();

    // Adds the title 'Modify comic' to the form.
    FormComic.formTitle('Modify comic');

    // Removes any previous validation.
    FormComic.cleanValidations();
  },

  /**
   * Adds the comic to the comics collection.
   */
  addComic: function() {
    /**
     * Function called when the submit button is clicked.
     */
    $('#form-add-comic').submit(function(event) {
      // Prevents default actions.
      event.preventDefault();

      /** @type {Object} Images loaded in the input 'input-images' element. */
      var files = $('#input-images')[0].files;

      /** @type {Array} Array that will contain images as DataURL. */
      var images = [];

      /** @type {Number} Number images loaded in the input 'input-images' element. */
      var total = files.length;

      /** @type {Number} Number of images that were readed as DataURL. */
      var loaded = 0;

      /**
       * Returns the ID of the genre.
       * @return {Number} ID of the genre.
       */
      function setGenre() {
        // Checks if the select 'select-genre' element is disabled
        if ($('#select-genre').prop('disabled')) {
          /** @type {Object} Creates a new genre object. */
          var genre = new Controller.Genre($('#input-genre').val());

          // Adds the new genre to the genre collection.
          Controller.setGenre(genre);

          // Calls the function 'addGenresToFilterDropdown' to add the new genre to the dropdown-filter-genre element.
          Navigation.addGenresToFilterDropdown();

          // Returns the ID of the new genre.
          return genre.id;
        } else {
          // Return the ID of the selected genre in the select 'select-genre' element.
          return $('#select-genre option:selected').val();
        }
      }

      /**
       * Adds a new comic or to modifies an existing one.
       */
      function onAllFilesLoaded() {
        /** @type {Object} A comic object. */
        var comic = {};

        // Checks whether to add a new comic or to modify an existing one.
        if ($('#add-comic-label').text() === 'Add comic') {
          // Creates a new comic object with the values obtained from the form.
          comic = new Controller.Comic($('#input-name').val(), setGenre(), $('#text-description').val().replace(/\n\r?/g, '<br />'), $('#input-quantity').val(), images, $('#text-videos').val());

          // Saves the new comic.
          Controller.setComic(comic);

          // Displays an alert.
          MainContent.showAlert('Comic added successfully.', '#alert-ok');
        } else {
          /** @type {Array} All the comics. */
          var comics = Controller.getComics();

          /// @type {Object} Comic to be modified.
          comic = Controller.getComic($('#input-id').val());

          /** @type {Number} Position (index) of the comic in the comics array. */
          var index = $.inArray(comic, comics);

          // Updates the name of the comic.
          comics[index].name = $('#input-name').val();

          // Updates the genre of the comic.
          comics[index].idGenre = setGenre();

          // Updates the description of the comic.
          comics[index].description = $('#text-description').val().replace(/\n\r?/g, '<br />');

          // Updates the quantity of the comic.
          comics[index].quantity = $('#input-quantity').val();

          // Updates the videos URLs of the comic.
          comics[index].videos = $('#text-videos').val();

          // Checks if the input 'checkbox-change-image' element is checked.
          if ($('#checkbox-change-image').prop('checked')) {
            // Updates the images of the comic.
            comics[index].images = images;
          }

          // Saves the changes.
          Controller.setComics(comics);

          // Displays an alert.
          MainContent.showAlert('Comic modified successfully.', '#alert-ok');
        }
        // Closes the form.
        $('#dialog-add-comic').modal('toggle');

        // Reloads the comics shown in the page.
        MainContent.loadComics();
      }

      /**
       * Converts the images to DataURL
       * @param  {Object} file A file from the files object.
       */
      function readData(file) {
        /** @type {Object} Instance of the FileReader object. */
        var fileReader = new FileReader();

        // Reads the image as DataURL.
        fileReader.readAsDataURL(file);

        /**
         * Function called when fileReader finishes loading a file.
         */
        fileReader.onloadend = function() {
          // Augments the loaded variable.
          loaded++;

          /** @type {String} Result of the converted image file to DataURL. */
          var image = fileReader.result;

          // Adds the image to the images array.
          images.push(image);

          // When all the images are converted the 'onAllFilesLoaded' is called.
          if (loaded == total) {
            onAllFilesLoaded();
          }
        };
      }

      /**
       * Iterates over the files object and call th function readData for every property of the object.
       */
      function readImages() {
        for (var i = 0; i < total; i++) {
          readData(files[i]);
        }
      }

      // Checks whether to add a new comic or to modify an existing one.
      if ($('#add-comic-label').text() === 'Add comic') {
        readImages();
      } else {
        // Checks if the input 'checkbox-change-image' element is checked. If it is calls the function to read the images, if it is not, it goes to update the comic
        if ($('#checkbox-change-image').prop('checked')) {
          readImages();
        } else {
          onAllFilesLoaded();
        }
      }
    });
  },

  /**
   * Fills the form with the values of the comic to modify.
   * @param  {Number} id          ID of the comic.
   * @param  {String} name        Name of the comic.
   * @param  {Number} idGenre     ID of the genre of the comic.
   * @param  {String} description Description of the comic.
   * @param  {Number} quantity    Quantity of the comic.
   * @param  {String} videos      Videos of the comic.
   */
  loadComicData: function(id, name, idGenre, description, quantity, videos) {
    $('#input-id').val(id);
    $('#input-name').val(name);
    $('#select-genre').val(idGenre);
    $('#text-description').val(description);
    $('#input-quantity').val(quantity);
    $('#text-videos').val(videos);
  },

  /**
   * Binds the change event to the input 'checkbox-change-image' element.
   */
  imageUploadInput: function() {
    $('#checkbox-change-image').change(function() {
      // Checks if the input 'checkbox-change-image' element is checked.
      if ($(this).prop('checked')) {
        // Enables the input 'input-images' element.
        $('#input-images').prop('disabled', false);
      } else {
        // Disables the input 'input-images' element.
        $('#input-images').prop('disabled', true);
      }
    });
  },

  /**
   * Validates if a comic already exists.
   */
  validateComicExists: function() {
    /** @type {String} Description of the error. */
    var errorMessage = 'Comic already exists.';

    /**
     * Binds the on input, on change and on propertychange events to the input 'input-name' element.
     */
    $('#input-name').on('input change propertychange', function() {
      /** @type {Boolean} Flag to check if there are error. */
      var hasError = false;

      var id = $('#input-id').val();

      /** @type {String} The comic's new name. */
      var name = $(this).val();

      /** @type {Object} A comic */
      var comic = Controller.getComicByName(name);

      // Checks if the form is for adding or modifying a comic.
      if ($('#add-comic-label').text() === 'Add comic') {
        // If comic is defined it means that a comic with the submitted name already exists.
        if (comic !== undefined) {
          hasError = true;
        }
      } else {
        // If comic is defined it means that a comic with the submitted name already exists.
        if (comic !== undefined) {
          // If the ID of the comic submitted is different from the ID of the comic to modify the comic already exist.
          if (comic.id !== id) {
            /** @type {Boolean} Flag to check if there is an error. */
            hasError = true;
          }
        }
      }

      // Sets the custom error.
      if (typeof this.setCustomValidity === 'function') {
        this.setCustomValidity(hasError ? errorMessage : '');
      }
    });
  },

  /**
   * Validates if a genre already exists.
   */
  validateGenreExists: function() {
    /** @type {String} Description of the error. */
    var errorMessage = 'Genre already exists.';

    /**
     * Binds the on input, on change and on propertychange events to the input 'input-genre' element.
     */
    $('#input-genre').on('input change propertychange', function() {
      /** @type {Object} A genre */
      var genre = Controller.getGenreByName($(this).val());

      /** @type {Boolean} Flag to check if there is an error. */
      var hasError = false;

      // If the object genre is defined there is already a comic with the submitted name.
      if (genre !== undefined) {
        hasError = true;
      }

      // Sets the custom error.
      if (typeof this.setCustomValidity === 'function') {
        this.setCustomValidity(hasError ? errorMessage : '');
      }
    });
  },

  /**
   * Validates if files uploaded are images.
   */
  validateImages: function() {
    /** @type {String} Description of the error. */
    var errorMessage = 'Invalid image file.';

    /**
     * Binds the on input, on change and on propertychange events to the input 'input-images' element.
     */
    $('#input-images').on('input change propertychange', function() {
      /** @type {[type]} Input 'input-images' element. */
      var el = $(this);

      /** @type {Number} Number of errors found. */
      var errors = 0;

      /** @type {Boolean} Flag to check if there is an error. */
      var hasError = false;

      /**
       * Checks for each file uploaded if it is an image.
       */
      $(el[0].files).each(function(index, img) {
        if (img.type !== 'image/jpeg' && img.type !== 'image/png' && img.type !== 'image/bmp' && img.type !== 'image/gif') {
          // If there is an error augments the error variable.
          errors++;
        }
      });

      // If there are errors the flag is set to true.
      hasError = (errors > 0) ? true : false;

      // Sets the custom error.
      if (typeof this.setCustomValidity === 'function') {
        this.setCustomValidity(hasError ? errorMessage : '');
      }
    });
  },

  /**
   * Validates if the videos URLs are correct.
   */
  validateVideosUrl: function() {
    /** @type {String} Description of the error. */
    var errorMessage = 'There is an invalid YouTube URL.';

    /**
     * Binds the on input, on change and on propertychange events to the textarea 'text-videos' element.
     */
    $('#text-videos').on('input change propertychange', function() {
      /** @type {RegExp} Regular expression for YouTube URLs */
      var patternRegex = new RegExp(/^http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/);

      /** @type {String} Videos URLs */
      var videos = $('#text-videos').val();

      /** @type {Array} Creates new array with the videos URLs. */
      var urls = videos.split(/\n/);

      /** @type {Number} Number of errors found. */
      var errors = 0;

      /** @type {Boolean} Flag to check if there is an error. */
      var hasError = false;

      /**
       * Checks every URL to see if they match the regular expression pattern.
       */
      $.each(urls, function(index, url) {
        if (!url.match(patternRegex)) {
          // If there are error the errors variable is augmentes
          errors++;
        }
      });

      // If there are errors the flag is set to true.
      hasError = (errors > 0) ? true : false;

      // Sets the custom error.
      if (typeof this.setCustomValidity === 'function') {
        this.setCustomValidity(hasError ? errorMessage : '');
      }
    });
  },

  /**
   * Checks the validity of the form elements.
   */
  formValidation: function() {
    /**
     * Add the status to the form element.
     * @param {Object} el     Form element
     * @param {String} status State of the validation.
     */
    function addStatusClass(el, status) {
      /** @type {Object} Parent element of the form element. */
      var parent = $(el).parent();

      // Checks the state of the validation.
      if (status === 'error') {
        // Remove any previously set state.
        parent.removeClass('has-success').addClass('has-error');

        // Check if the element is the input 'input-images' and adds the validation message to the corresponding element.
        if ($(el).attr('id') === 'input-images') {
          $(el).next().next().text($(el)[0].validationMessage);
        } else {
          $(el).next().text($(el)[0].validationMessage);
        }
      } else {
        // Remove any previously set state.
        parent.removeClass('has-error').addClass('has-success');

        // Check if the element is the input 'input-images' and removes the validation message from the corresponding element.
        if ($(el).attr('id') === 'input-images') {
          $(el).next().next().text('');
        } else {
          $(el).next().text('');
        }
      }
    }

    /**
     * Checks every element in the form.
     */
    $('#input-name, #select-genre, #input-genre, #text-description, #input-quantity, #text-videos, #input-images').each(function(index) {
      /** @type {Object} A form element. */
      var input = $(this);

      /** @type {String} Event */
      var e = '';

      // If the element is the input 'input-images' the event change is set, if it is not, the event input is set.
      if (input.attr('id') === 'input-images') {
        e = 'change';
      } else {
        e = 'input';
      }

      /**
       * Binds the corresponding event to the form element.
       */
      input.on(e, function() {
        // Check the validity of the element and calls the addStatusClass function to set the state of the element.
        if (input[0].checkValidity() === false) {
          addStatusClass('#' + input.attr('id'), 'error');
        } else {
          addStatusClass('#' + input.attr('id'), 'success');
        }
      });
    });
  },

  /**
   * Removes any validation message and styling.
   */
  cleanValidations: function() {
    /**
     * Checks every element in the form.
     */
    $('#input-name, #select-genre, #input-genre, #text-description, #input-quantity, #text-videos, #input-images').each(function(index) {
      /** @type {Object} A form element */
      var input = $(this);

      // Removes the validation styles for the form elements.
      input.parent().removeClass('has-success');
      input.parent().removeClass('has-error');
    });

    // Removes the validation messages.
    $('#form-add-comic .error').text('');
  },

  /**
   * Initialization of the FormComic module functions.
   */
  init: function() {
    FormComic.addGenresToSelect();
    FormComic.selectGenreChange();
    FormComic.addComic();
    FormComic.imageUploadInput();
    FormComic.validateComicExists();
    FormComic.validateVideosUrl();
    FormComic.validateImages();
    FormComic.formValidation();
  }
};