var Navigation = {
  availableComics: [],

  addComicsToSearch: function() {
    $.each(App.comics, function(index, comic) {
      Navigation.availableComics.push(comic.name);
    });

    $('#input-search-comic').autocomplete({
      source: Navigation.availableComics
    });
  },

  addGenresToDropdown: function() {
    $.each(App.genres, function(index, genre) {
      $('#dropdown-genre-menu').append('<li><a href=\'#\'>' + genre.name + '</a></li>');
      $('#select-genre').append('<option value=\'' + genre.id + '\'>' + genre.name + '</option>');
    });
  },

  filterGenre: function() {
    $('#dropdown-genre-menu li').click(function(e) {
      if ($(this).text() === 'Show all') {
        $('#comiscCollection .comic-item').show(500);
      } else {
        $('#comiscCollection .comic-item').show(500);
        $('#comiscCollection .comic-item:not(:contains(' + $(this).text() + '))').hide(500);
      }
    });
  },

  resetForm: function() {
    $('#button-add-comic').click(function(e) {
      $('#form-add-comic').trigger("reset");
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