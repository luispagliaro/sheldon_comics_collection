'use strict';

/** @type {Object} Controller module */
var Controller = Controller || {};

/**
 * A comic object.
 * @param {String} name        Comic name.
 * @param {Number} idGenre     Comic genre ID.
 * @param {String} description Comic description.
 * @param {NUmber} quantity    Comic quantity.
 * @param {Array} images       Comic images.
 * @param {Array} videos       Comic videos.
 */
Controller.Comic = function(name, idGenre, description, quantity, images, videos, idVenue) {
  this.id = Controller.getComics().slice(-1)[0] ? Controller.getComics().slice(-1)[0].id + 1 : 1;
  this.name = name;
  this.idGenre = idGenre;
  this.description = description;
  this.quantity = quantity;
  this.images = images;
  this.videos = videos;
  this.idVenue = idVenue;
};

/**
 * Saves a comic in local storage.
 * @param {Object} comic A comic object.
 */
Controller.setComic = function(comic) {
  // Saves a comic in the comic array.
  Controller.comics.push(comic);

  // Saves the changes in local storage.
  localStorage.setItem('comics', JSON.stringify(Controller.comics));
};

/**
 * Saves the comics in local storage.
 * @param {Array} comics Array of comics.
 */
Controller.setComics = function(comics) {
  // Saves the comics in the comic array.
  Controller.comics = comics;

  // Saves the changes in local storage.
  localStorage.setItem('comics', JSON.stringify(Controller.comics));
};

/**
 * Get the comics from local storage.
 * @return {Object} Array of comics.
 */
Controller.getComics = function() {
  // Checks if there are comics in local storage.
  if (localStorage.getItem('comics') === '' || localStorage.getItem('comics') === null) {
    // Creates the comics item in local storage.
    localStorage.setItem('comics', JSON.stringify([]));
  }

  // Gets the comics from local storage and saves them in the comics array.
  Controller.comics = JSON.parse(localStorage.getItem('comics'));

  // Returns the comics array.
  return Controller.comics;
};

/**
 * Gets a comic.
 * @param  {Number} idComic A comic ID.
 * @return {Object}         A comic object.
 */
Controller.getComic = function(idComic) {
  /** @type {Object} A comic object */
  var result = $.grep(Controller.comics, function(e) {
    return e.id == idComic;
  });

  return result[0];
};

/**
 * Gets a comic by name.
 * @param  {String} comicName A comic's name.
 * @return {Object}           A comic object.
 */
Controller.getComicByName = function(comicName) {
  /** @type {Object} A comic object */
  var result = $.grep(Controller.comics, function(e) {
    return e.name == comicName;
  });

  return result[0];
};