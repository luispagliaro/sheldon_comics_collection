'use strict';

/** @type {Object} Controller module */
var Controller = Controller || {};

/**
 * A genre object
 * @param {String} name Genre description.
 */
Controller.Genre = function(name) {
  this.id = Controller.genres.length + 1;
  this.name = name;
};

/**
 * Saves a genre in local storage.
 * @param {Object} genre A genre object.
 */
Controller.setGenre = function(genre) {
  // Saves a genre in the genre array.
  Controller.genres.push(genre);

  // Saves the changes in local storage.
  localStorage.setItem('genres', JSON.stringify(Controller.genres));
};

/**
 * Saves the genres in local storage.
 * @return {Object} A genre object.
 */
Controller.getGenres = function() {
  // Checks if there are genres in local storage.
  if (localStorage.getItem('genres') === '' || localStorage.getItem('genres') === null) {
    // Creates the genres item in local storage.
    localStorage.setItem('genres', JSON.stringify([]));
  }

  // Gets the genres from local storage and saves them in the genres array.
  Controller.genres = JSON.parse(localStorage.getItem('genres'));

  // Returns the genres array.
  return Controller.genres;
};

/**
 * Gets a genre.
 * @param  {Number} idGenre A genre ID.
 * @return {object}         A genre object.
 */
Controller.getGenre = function(idGenre) {
  /** @type {Object} A genre object */
  var result = $.grep(Controller.genres, function(e) {
    return e.id == idGenre;
  });

  return result[0];
};

/**
 * Gets a genre by name.
 * @param  {String} genreName A genre's name.
 * @return {Object}           A genre object.
 */
Controller.getGenreByName = function(genreName) {
  /** @type {Object} A genre object */
  var result = $.grep(Controller.genres, function(e) {
    return e.name == genreName;
  });

  return result[0];
};