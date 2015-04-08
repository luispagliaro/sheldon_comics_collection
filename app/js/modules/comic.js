'use strict';

var App = App || {};

App.Comic = function(name, idGenre, description, quantity, images, videos) {
  this.id = App.getComicsLength() + 1;
  this.name = name;
  this.idGenre = idGenre;
  this.description = description;
  this.quantity = quantity;
  this.images = images;
  this.videos = videos;
};

App.setComic = function(comic) {
  App.comics.push(comic);
  localStorage.setItem('comics', JSON.stringify(App.comics));
};

App.getComics = function() {
  App.comics = JSON.parse(localStorage.getItem('comics')) || [];
  return App.comics;
};

App.getComic = function(idComic) {
  var result = $.grep(App.comics, function(e) {
    return e.id == idComic;
  });
  return result[0];
};

App.getComicByName = function(comicName) {
    var result = $.grep(App.comics, function(e) {
    return e.name == comicName;
  });
  return result[0];
}

App.getComicsLength = function() {
  if (App.comics !== null) {
    return App.comics.length;
  } else {
    return 0;
  }
};