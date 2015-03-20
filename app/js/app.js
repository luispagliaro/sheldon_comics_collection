var App = App || {};

var comics = JSON.parse(localStorage.getItem("comics")) || [];
var genres = JSON.parse(localStorage.getItem("genres")) || [];

App.Comic = function(name, idGenre, description, quantity) {
  this.id = App.getComicsLength() + 1;
  this.name = name;
  this.genre = App.getGenre(idGenre).name;
  this.description = description;
  this.quantity = quantity;
};

App.setComic = function(comic) {
  comics.push(comic);
  localStorage.setItem("comics", JSON.stringify(comics));
}

App.getComics = function() {
  comics = JSON.parse(localStorage.getItem("comics"));
  return comics;
};

App.getComic = function(idComic) {
  var result = $.grep(comics, function(e) {
    return e.id == idComic;
  });
  return result[0];
};

App.getComicsLength = function() {
  return comics.length;
};

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