'use strict';

$(document).ready(function() {
  App.getGenres();
  App.getComics();
  
  MainContent.init();
  Navigation.init();
  FormComic.init();
});