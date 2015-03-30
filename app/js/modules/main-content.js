var MainContent = {
  loadComics: function() {
    $.each(App.comics, function(index, comic) {
      $('#comiscCollection').append('<div class=\'comic-item col-xs-6 col-md-3\'><h3><a href=\'#\'>' + comic.name + '</a></h3><span class=\'label label-success\'>' + App.getGenre(comic.idGenre).name + '</span><div class=\'thumbnail\'><img src=\'' + comic.images[0] + '\' /><p class=\'caption\'>' + comic.description + '</p></div></div>');
    });
  },

  init: function() {
    MainContent.loadComics();
  }
};