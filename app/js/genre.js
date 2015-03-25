var App = App || {};

var genres = JSON.parse(localStorage.getItem("genres")) || [];

App.Genre = function(name) {
  this.id = App.getGenresLength() + 1;
  this.name = name;
};

App.setGenre = function(genre) {
  genres.push(genre);
  localStorage.setItem("genres", JSON.stringify(genres));
}

App.getGenres = function() {
  genres = JSON.parse(localStorage.getItem("genres"));
  return genres;
};

App.getGenre = function(idGenre) {
  var result = $.grep(genres, function(e) {
    return e.id == idGenre;
  });
  return result[0];
};

App.getGenresLength = function() {
  return genres.length;
};