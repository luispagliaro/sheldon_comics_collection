'use strict';

var Navigation = {
  availableComics: [],

  addComicsToSearch: function() {
    if (Controller.comics !== null) {
      $.each(Controller.comics, function(index, comic) {
        Navigation.availableComics.push(comic.name);
      });

      $('#input-search-comic').autocomplete({
        source: Navigation.availableComics,

        select: function(e, ui) {
          var comic = Controller.getComicByName(ui.item.value);

          if (comic != null) {
            $('.comic-item').show();
            $('.comic-item:not([id=' + comic.id + '])').hide(500);
          }
        },

        change: function(event, ui) {
          if ($("#input-search-comic").val() == '') {
            $('.comic-item').show(500);
          }
        }
      });
    }
  },

  addGenresToDropdown: function() {
    if (Controller.genres !== null) {
      $.each(Controller.genres, function(index, genre) {
        $('#dropdown-genre-menu').append('<li><a href=\'#\'>' + genre.name + ' <span class="genre-filter-selection glyphicon glyphicon-ok"></a></li>');
        $('#select-genre').append('<option value=\'' + genre.id + '\'>' + genre.name + '</option>');
      });

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

  resetForm: function() {
    $('#button-add-comic').click(function() {
      $('#form-add-comic').trigger('reset');
      $('#input-genre').hide();
      $('#select-genre').show();
    });
    $('#button-login').click(function() {
      $('#form-login').trigger('reset');
    });
  },

  userLogedIn: function(status) {
    if (status === 'logedin') {
      $('#button-login').hide();
      $('#button-add-comic').show();
      $('#button-logout').show();
    } else {
      $('#button-login').show();
      $('#button-add-comic').hide();
      $('#button-logout').hide();
    }
  },

  logout: function() {
    $('#button-logout').click(function() {
      Logout.logout();
    });
  },

  init: function() {
    Navigation.addComicsToSearch();
    Navigation.addGenresToDropdown();
    Navigation.filterGenre();
    Navigation.resetForm();
    Navigation.logout();
  }
};