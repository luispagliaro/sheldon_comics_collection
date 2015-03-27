var App = App || {};

var comics = JSON.parse(localStorage.getItem("comics")) || [];

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
  comics.push(comic);
  localStorage.setItem("comics", JSON.stringify(comics));
}

App.getComics = function() {
  comics = JSON.parse(localStorage.getItem("comics"));
  return comics;
};

App.getComic = function(idComic) {
  var result = $.grep(comics, function(e) {
    return e.id == idComic;
  });
  return result[0];
};

App.getComicsLength = function() {
  return comics.length;
};
