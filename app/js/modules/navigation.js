'use strict';

var Navigation = {
  availableComics: [],

  addComicsToSearch: function() {
    if (App.comics !== null) {
      $.each(App.comics, function(index, comic) {
        Navigation.availableComics.push(comic.name);
      });

      $('#input-search-comic').autocomplete({
        source: Navigation.availableComics,

        select: function(e, ui) {
          var comic = App.getComicByName(ui.item.value);

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
    if (App.genres !== null) {
      $.each(App.genres, function(index, genre) {
        $('#dropdown-genre-menu').append('<li><a href=\'#\'>' + genre.name + '</a></li>');
        $('#select-genre').append('<option value=\'' + genre.id + '\'>' + genre.name + '</option>');
      });
    }
  },

  filterGenre: function() {
    $('#dropdown-genre-menu li').click(function() {
      if ($(this).text() === 'Show all') {
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
  },

  init: function() {
    Navigation.addComicsToSearch();
    Navigation.addGenresToDropdown();
    Navigation.filterGenre();
    Navigation.resetForm();
  }
};