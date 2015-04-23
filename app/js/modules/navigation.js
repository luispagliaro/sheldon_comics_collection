'use strict';

var Navigation = {
  addComicsToSearch: function() {
    var availableComics = [];

    if (Controller.comics !== []) {
      $.each(Controller.comics, function(index, comic) {
        availableComics.push(comic.name);
      });

      $('#input-search-comic').autocomplete({
        source: availableComics,

        select: function(e, ui) {
          var comic = Controller.getComicByName(ui.item.value);

          if (comic !== null) {
            $('.comic-item').show();
            $('.comic-item:not([id=' + comic.id + '])').hide(500);
          }
        },

        change: function(event, ui) {
          if ($("#input-search-comic").val() === '') {
            $('.comic-item').show(500);
          }
        }
      });
    }
  },

  addGenresToFilterDropdown: function() {
    if (Controller.genres.length !== 0) {
      $('#dropdown-genre-menu').empty();

      $.each(Controller.genres, function(index, genre) {
        $('#dropdown-genre-menu').append('<li><a href=\'#\'>' + genre.name + ' <span class="genre-filter-selection glyphicon glyphicon-ok"></a></li>');
      });

      $('#dropdown-genre-menu').append('<li><a href=\'#\'>Show all <span class="genre-filter-selection glyphicon glyphicon-ok"></a></li>');

      $('.genre-filter-selection').hide();
      $('#dropdown-genre-menu li:contains(\'Show all \')').children('a').children('span').show();
    }
  },

  filterGenre: function() {
    $('#dropdown-genre-menu li').click(function() {
      $('.genre-filter-selection').hide();
      $(this).children('a').children('span').show();

      if ($(this).text() === 'Show all ') {
        $('#comics-collection .comic-item').show(500);
      } else {
        $('#comics-collection .comic-item').show(500);
        $('#comics-collection .comic-item:not(:contains(' + $(this).text() + '))').hide(500);
      }
    });
  },

  addComicButtonClick: function() {
    $('#button-add-comic').click(function() {
      FormComic.setFormAddComic();
    });
  },

  loginButtonClick: function() {
    $('#button-login').click(function() {
      $('#form-login').trigger('reset');
    });
  },

  userLogedIn: function(status) {
    if (status === 'logedin') {
      $('#button-login').hide();
      $('#button-add-comic').show();
      $('#button-logoff').show();
    } else {
      $('#button-login').show();
      $('#button-add-comic').hide();
      $('#button-logoff').hide();
    }
  },

  logoff: function() {
    $('#button-logoff').click(function() {
      Logout.logoff();
    });
  },

  init: function() {
    Navigation.addComicsToSearch();
    Navigation.addGenresToFilterDropdown();
    Navigation.addComicButtonClick();
    Navigation.loginButtonClick();
    Navigation.filterGenre();
    Navigation.logoff();
  }
};