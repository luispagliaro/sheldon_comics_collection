'use strict';

$(document).ready(function() {
  Controller.getGenres();
  Controller.getComics();

  MainContent.init();
  Navigation.init();
  FormComic.init();
  LogInOut.init();
});