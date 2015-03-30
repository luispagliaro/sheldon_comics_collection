var App = App || {};

App.comics = [];

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
  localStorage.setItem("comics", JSON.stringify(comics));
}

App.getComics = function() {
  App.comics = JSON.parse(localStorage.getItem("comics"));
  return App.comics;
};

App.getComic = function(idComic) {
  var result = $.grep(App.comics, function(e) {
    return e.id == idComic;
  });
  return result[0];
};

App.getComicsLength = function() {
  return App.comics.length;
};
