'use strict';

var Controller = Controller || {};

Controller.Comic = function(name, idGenre, description, quantity, images, videos) {
  this.id = Controller.getComics().slice(-1)[0] ? Controller.getComics().slice(-1)[0].id + 1 : 1;
  this.name = name;
  this.idGenre = idGenre;
  this.description = description;
  this.quantity = quantity;
  this.images = images;
  this.videos = videos;
};

Controller.setComic = function(comic) {
  Controller.comics.push(comic);
  localStorage.setItem('comics', JSON.stringify(Controller.comics));
};

Controller.setComics = function(comics) {
  Controller.comics = comics;
  localStorage.setItem('comics', JSON.stringify(Controller.comics));
};

Controller.getComics = function() {
  if (localStorage.getItem('comics') === "") {
    localStorage.setItem('comics', JSON.stringify([]));
  }
  
  Controller.comics = JSON.parse(localStorage.getItem('comics'));
  return Controller.comics;
};

Controller.getComic = function(idComic) {
  var result = $.grep(Controller.comics, function(e) {
    return e.id == idComic;
  });
  return result[0];
};

Controller.getComicByName = function(comicName) {
  var result = $.grep(Controller.comics, function(e) {
    return e.name == comicName;
  });
  return result[0];
};

Controller.getComicsLength = function() {
  if (Controller.comics !== null) {
    return Controller.comics.length;
  } else {
    return 0;
  }
};

Controller.initComics = function() {
  localStorage.setItem('comics', []);
};