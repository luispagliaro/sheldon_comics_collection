'use strict';

var Controller = Controller || {};

Controller.Genre = function(name) {
  this.id = Controller.getGenresLength() + 1;
  this.name = name;
};

Controller.setGenre = function(genre) {
  Controller.genres.push(genre);
  localStorage.setItem('genres', JSON.stringify(Controller.genres));
};

Controller.getGenres = function() {
  Controller.genres = JSON.parse(localStorage.getItem('genres')) || [];
  return Controller.genres;
};

Controller.getGenre = function(idGenre) {
  var result = $.grep(Controller.genres, function(e) {
    return e.id == idGenre;
  });
  return result[0];
};

Controller.getGenresLength = function() {
  if (Controller.genres !== null) {
    return Controller.genres.length;
  } else {
    return 0;
  }
};