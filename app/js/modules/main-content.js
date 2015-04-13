'use strict';

var MainContent = {
  loadComics: function() {
    if (App.comics !== null) {
      $.each(App.comics, function(index, comic) {
        var itemLabel = '',
          title = '';

        if (comic.quantity == 1) {
          itemLabel = ' item';
        } else {
          itemLabel = ' items';
        }

        if (comic.name.length > 20) {
          title = comic.name.substr(0, 20) + '...';
        } else {
          title = comic.name;
        }

        $('#comics-collection').append('<div id=\'' + comic.id + '\' class=\'comic-item col-xs-6 col-sm-4 col-md-3\'><h4>' + title + '</h4><span class=\'label label-success\'>' + App.getGenre(comic.idGenre).name + '</span>' + ' ' + '<span class=\'badge\'>' + comic.quantity + itemLabel + '</span><div class=\'thumbnail\'><img src=\'' + comic.images[0] + '\' class=\'img-responsive\' alt=\'' + comic.description + '\'/><p class=\'caption\'>' + comic.description + '</p><button class=\'btn btn-default btn-sm image-gallery-button\' type=\'button\' id=\'image-gallery-' + comic.id + '\'><i class=\'glyphicon glyphicon-picture\'></i></button><button id=\'video-gallery-' + comic.id + '\' type=\'button\' class=\'btn btn-default btn-sm video-gallery-button\'><i class=\'glyphicon glyphicon-film\'></i></button><a id=\'share-' + comic.id + '\' class=\'btn btn-social btn-xs btn-vk\'><i class=\'fa fa-facebook\'></i>Share</a></div></div>');

        if (comic.name.length > 20) {
          $('.comic-item[id=' + comic.id + '] h4').attr('title', comic.name);
        }
      });

      $(document).tooltip();
    }
  },

  imageVideoGallery: function() {
    $('.image-gallery-button').on('click', function(event) {
      event.preventDefault();

      var a = [];

      var id = $(this).attr('id');
      id = id.substr((id.length - 1), 1);

      var comic = App.getComic(id);

      blueimp.Gallery(comic.images, $('#blueimp-gallery').data());
    });

    $('.video-gallery-button').on('click', function(event) {
      event.preventDefault();

      var a = [];

      var id = $(this).attr('id');
      id = id.substr((id.length - 1), 1);

      var comic = App.getComic(id);

      var lines = comic.videos.split(/\n/);
      var urls = [];
      var videos = [];

      for (var i = 0; i < lines.length; i++) {
        if (/\S/.test(lines[i])) {
          urls.push($.trim(lines[i]));
        }
      }

      $.each(urls, function(index, url) {
        var video = {
          href: url,
          type: 'text/html',
          youtube: url.split('watch?v=')[1],
          poster: 'http://img.youtube.com/vi/' + url.split('watch?v=')[1] + '/0.jpg'
        };

        videos.push(video);
      });

      blueimp.Gallery(videos, $('#blueimp-gallery').data());
    });
  },

  shareOnFB: function() {
    $('.btn-social').on('click', function(e) {
      e.preventDefault();

      var id = $(this).attr('id');
      id = id.substr((id.length - 1), 1);

      var comic = App.getComic(id);

      FB.ui({
        method: 'feed',
        name: comic.name,
        link: 'http://www.matvey.com.ar/comics/index.html#' + comic.id,
        picture: '',
        caption: App.getGenre(comic.idGenre).name,
        description: comic.description,
        message: ''
      });
    });
  },

  init: function() {
    MainContent.loadComics();
    MainContent.imageVideoGallery();
    MainContent.shareOnFB();
  }
};