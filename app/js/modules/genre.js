'use strict';

var Controller = Controller || {};

Controller.Genre = function(name) {
  this.id = Controller.genres.length + 1;
  this.name = name;
};

Controller.setGenre = function(genre) {
  Controller.genres.push(genre);
  localStorage.setItem('genres', JSON.stringify(Controller.genres));
};

Controller.getGenres = function() {
  if (localStorage.getItem('genres') === '' || localStorage.getItem('genres') === null) {
    localStorage.setItem('genres', JSON.stringify([]));
  }

  Controller.genres = JSON.parse(localStorage.getItem('genres'));
  return Controller.genres;
};

Controller.getGenre = function(idGenre) {
  var result = $.grep(Controller.genres, function(e) {
    return e.id == idGenre;
  });
  return result[0];
};

Controller.getGenreByName = function(genreName) {
  var result = $.grep(Controller.genres, function(e) {
    return e.name == genreName;
  });
  return result[0];
};