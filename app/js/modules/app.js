'use strict';

$(document).ready(function() {
  // Loads the comics and genre data.
  Controller.getGenres();
  Controller.getComics();

  // Initializes all the modules.
  MainContent.init();
  Navigation.init();
  FormComic.init();
  LogInOut.init();
});