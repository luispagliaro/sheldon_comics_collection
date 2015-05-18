'use strict';

/**
 * Module containing all functionality related to the navigation.
 * @type {Object}
 */
var Navigation = {
  /**
   * Adds all the comics to the search input.
   */
  addComicsToSearch: function() {
    /** @type {Array} Array of comics names. */
    var availableComics = [];

    // Check if there are any comics.
    if (Controller.comics.length > 0) {
      /**
       * Adds the name of the comics to the availableComics array.
       */
      $.each(Controller.comics, function(index, comic) {
        availableComics.push(comic.name);
      });

      // Creates the autocomplete functionality.
      $('#input-search-comic').autocomplete({
        source: availableComics,

        select: function(e, ui) {
          /** @type {Object} A comic. */
          var comic = Controller.getComicByName(ui.item.value);

          // Checks if a comic with the name inputted exists.
          if (comic !== null) {
            // Shows all the comics in case they were not all showing.
            $('.comic-item').show();

            // Hides all the comics except the one that was searched for.
            $('.comic-item:not([id=' + comic.id + '])').hide(500);
          }

          // Moves the focus out of the search input.
          $('#input-search-comic').blur();
        },

        change: function(event, ui) {
          // Checks if there is no value in the search input.
          if ($('#input-search-comic').val() === '') {
            // Shows all the comics.
            $('.comic-item').show(500);
          }
        }
      });
    }
  },

  /**
   * Prevents the events when pressing the enter key on the search input.
   */
  preventEnter: function() {
    /**
     * Binds the on keydown event to the input 'input-search-comic' element.
     */
    $('#input-search-comic').keydown(function(event) {
      // Checks if the key pressed is the enter key.
      if (event.keyCode == 13) {
        event.preventDefault();

        return false;
      }
    });
  },

  /**
   * Adds the genres to the filter by genre dropdown.
   */
  addGenresToFilterDropdown: function() {
    // Checks if there any genres.
    if (Controller.genres.length > 0) {
      // Clears the dropdown.
      $('#dropdown-genre-menu').empty();

      /**
       * Adds an 'li' element for each genre.
       */
      $.each(Controller.genres, function(index, genre) {
        $('#dropdown-genre-menu').append('<li><a href=\'#\'>' + genre.name + ' <span class="genre-filter-selection glyphicon glyphicon-ok"></a></li>');
      });

      // Adds the 'Show all' option.
      $('#dropdown-genre-menu').append('<li><a href=\'#\'>Show all <span class="genre-filter-selection glyphicon glyphicon-ok"></a></li>');

      // Clears the selected option.
      $('.genre-filter-selection').hide();

      // Checks the 'Show all' option as default.
      $('#dropdown-genre-menu li:contains(\'Show all \')').children('a').children('span').show();

      Navigation.filterGenre();
    }
  },

  /**
   * Shows the comics that have the selected genre.
   */
  filterGenre: function() {
    /**
     * Unbinds any previous click event.
     */
    $('#dropdown-genre-menu li').unbind('click');

    /**
     * Binds the on click event to the 'li' element of the genre dropdown.
     */
    $('#dropdown-genre-menu li').click(function() {
      /** @type {Object} A li element of the dropdown. */
      var el = $(this);

      // Clears any previous selection of a genre.
      $('.genre-filter-selection').hide();

      // Displays the tick to show which genre is selected.
      el.children('a').children('span').show();

      // Checks which genre was clicked and shows the comics corresponding to it.
      if (el.text() === 'Show all ') {
        $('#comics-collection .comic-item').show(500);
      } else {
        $('#comics-collection .comic-item').show(500);
        $('#comics-collection .comic-item:not(:contains(' + el.text() + '))').hide(500);
      }
    });
  },

  /**
   * Fires the event for the add comic button click.
   */
  addComicButtonClick: function() {
    /**
     * Binds the on click event to the button 'button-add-comic' element.
     */
    $('#button-add-comic').click(function() {
      // Calls the 'setFormAddComic' event to set the setting for the add comic form.
      FormComic.setFormAddComic();
    });
  },

  /**
   * Fires the event for the login button click.
   */
  loginButtonClick: function() {
    /**
     * Binds the on click event to the button 'button-login' element.
     */
    $('#button-login').click(function() {
      // Resets all the fields in the login form.
      $('#form-login').trigger('reset');
    });
  },

  /**
   * Checks for every social network if the user is loged in.
   */
  socialButtonsState: function() {
    $('.social-login').each(function(index, el) {
      /** @type {String} Name of the network clicked. */
      var network = Navigation.getSocialNetwork(el);

      /** @type {Boolean} Status of the current social network session. */
      var status = LogInOut.checkSignIn(network);

      // Checks the status of the session and sets the correct action for the li 'social-login' element.
      if (status) {
        $('#' + el.id + ' i').text(' Log out from ' + (network.charAt(0).toUpperCase() + network.substring(1)));

        // Checks if he network to be loged in is Foursquare.
        if (network === 'foursquare') {
          // Calls the 'checkList' function.
          Foursquare.checkList();
        }
      } else {
        $('#' + el.id + ' i').text(' Log in to ' + (network.charAt(0).toUpperCase() + network.substring(1)));
      }
    });
  },

  /**
   * Gets the name of the social network to be used.
   * @param  {Object} el li 'social-login' element clicked.
   * @return {String}    Name of the social network.
   */
  getSocialNetwork: function(el) {
    // Sets the network name according to what li element was clicked.
    switch (el.id) {
      case 'tw-log':
        return 'twitter';
      case 'go-log':
        return 'google';
      case 'fb-log':
        return 'facebook';
      case 'fs-log':
        return 'foursquare';
    }
  },

  /**
   * Opens the log in pop up for the selected social network.
   */
  socialLoginClick: function() {
    /**
     * Binds the on click event to the li 'social-login' element.
     */
    $('.social-login').click(function() {
      /** @type {String} Name of the network clicked. */
      var network = Navigation.getSocialNetwork($(this)[0]);

      // Checks if the user is loged in to the current network.
      if (LogInOut.checkSignIn(network)) {
        hello.logout(network).then(function() {
          Navigation.socialButtonsState();

          // Calls the 'showAlert' function to shows an alert to the user.
          MainContent.showAlert('Loged out from ' + network + ' successfully.', '#alert-ok');
        }, function() {
          // Calls the 'showAlert' function to shows an alert to the user.
          MainContent.showAlert('Error trying to log out from ' + network + '.', '#alert-fail');
        });
      } else {
        /** @type {Object} Setting for the login popup. */
        var options = {
          scope: 'publish'
        };

        // Opens the log in pop up for the selected social network.
        hello.login(network, options).then(function() {
          Navigation.socialButtonsState();

          // Calls the 'showAlert' function to shows an alert to the user.
          MainContent.showAlert('Loged in to ' + network + ' successfully.', '#alert-ok');
        }, function() {
          // Calls the 'showAlert' function to shows an alert to the user.
          MainContent.showAlert('Error trying to log in to ' + network + '.', '#alert-fail');
        });
      }
    });
  },

  /**
   * Sets the setting for when the user is loged in and for when it is not loged in.
   * @param  {String} status Status logedin or not logedin.
   */
  userLogedIn: function(status) {
    // Checks the status of the user
    if (status === 'logedin') {
      // Hides the button 'button-login' element.
      $('#button-login').hide();

      // Shows the button 'button-add-comic' element.
      $('#button-add-comic').css('display', 'inline-block');

      // Shows the button 'button-logout' element.
      $('#button-logout').css('display', 'inline-block');

      // Shows the button 'button-social-login' element.
      $('#button-social-login').css('display', 'inline-block');
    } else {
      // Shows the button 'button-login' element.
      $('#button-login').css('display', 'inline-block');

      // Hides the button 'button-add-comic' element.
      $('#button-add-comic').hide();

      // Hides the button 'button-logout' element.
      $('#button-logout').hide();

      // Shows the button 'button-social-login' element.
      $('#button-social-login').hide();
    }
  },

  /**
   * Loads the Google Map with the location of the venues where the comics were bought.
   */
  loadMap: function() {
    /**
     * Binds the on shown event to resize map when the modal is shown.
     */
    $('#dialog-venues-map').on('shown.bs.modal', function() {
      /** @type {Object} Google map. */
      var map = new google.maps.Map(document.getElementById('venues-map'), {
        zoom: 4,
        center: new google.maps.LatLng(-38.416097, -63.616672),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      /** @type {Array} All the comics. */
      var comics = Controller.getComics();

      $.each(comics, function(index, el) {
        $.ajax({
          type: 'GET',
          url: 'https://api.foursquare.com/v2/venues/' + el.idVenue + '?client_id=PJGJ33BJMRIPCEQ2GHZICEMDNAPMI3Y5QKCO3Z0TK133H5CD&client_secret=VWYEN4DM5A04OAPQKS5R4DYN4GELHHLC0W3AUFRTV102XOVJ&v=20140806&m=foursquare',
          success: function(data) {
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(data.response.venue.location.lat, data.response.venue.location.lng),
              map: map
            });
          }
        });
      });

      // Resizes the google map.
      google.maps.event.trigger(map, 'resize');

      // Sets the center of the map.
      map.setCenter(new google.maps.LatLng(-38.416097, -63.616672));
    });
  },

  /**
   * Logs the user out
   */
  logout: function() {
    /**
     * Binds the on click event to the button 'button-logout' element.
     */
    $('#button-logout').click(function() {
      // Calls the logout function to log out the user.
      LogInOut.logout();
    });
  },

  /**
   * Initialization of the Navigation module function.
   */
  init: function() {
    Navigation.addComicsToSearch();
    Navigation.addGenresToFilterDropdown();
    Navigation.addComicButtonClick();
    Navigation.loginButtonClick();
    Navigation.socialButtonsState();
    Navigation.socialLoginClick();
    Navigation.filterGenre();
    Navigation.loadMap();
    Navigation.preventEnter();
    Navigation.logout();
  }
};