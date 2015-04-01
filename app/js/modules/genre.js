'use strict';

var App = App || {};

App.Genre = function(name) {
  this.id = App.getGenresLength() + 1;
  this.name = name;
};

App.setGenre = function(genre) {
  App.genres.push(genre);
  localStorage.setItem('genres', JSON.stringify(App.genres));
};

App.getGenres = function() {
  App.genres = JSON.parse(localStorage.getItem('genres')) || [];
  return App.genres;
};

App.getGenre = function(idGenre) {
  var result = $.grep(App.genres, function(e) {
    return e.id == idGenre;
  });
  return result[0];
};

App.getGenresLength = function() {
  if (App.genres !== null) {
    return App.genres.length;
  } else {
    return 0;
  }
};