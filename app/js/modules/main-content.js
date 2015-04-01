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

        $('#comics-collection').append('<div id=\'' + comic.id + '\' class=\'comic-item col-xs-6 col-sm-4 col-md-3\'><h4>' + title + '</h4><span class=\'label label-success\'>' + App.getGenre(comic.idGenre).name + '</span>' + ' ' + '<span class=\'badge\'>' + comic.quantity + itemLabel + '</span><div class=\'thumbnail\'><img src=\'' + comic.images[0] + '\' class=\'img-responsive\' alt=\'' + comic.description + '\'/><p class=\'caption\'>' + comic.description + '</p><button class=\'btn btn-default btn-sm image-gallery-button\' type=\'button\' id=\'image-gallery-' + comic.id + '\'><i class=\'glyphicon glyphicon-picture\'></i></button><button id=\'video-gallery-' + comic.id + '\' type=\'button\' class=\'btn btn-default btn-sm video-gallery-button\'><i class=\'glyphicon glyphicon-film\'></i></button></div></div>');

        if (comic.name.length > 20) {
          $('.comic-item[id=' + comic.id + '] h4').attr('title', comic.name);
        }
      });

      $('.image-gallery-button').on('click', function(event) {
        event.preventDefault();

        var a = [];

        var id = $(this).attr('id');;
        id = id.substr((id.length - 1), 1);

        var comic = App.getComic(id);

        blueimp.Gallery(comic.images, $('#blueimp-gallery').data());
      });

      /*$('.video-gallery-button').on('click', function(event) {
        event.preventDefault();

        var a = [];

        var id = $(this).attr('id');
        id = id.substr((id.length - 1), 1);

        var comic = App.getComic(id);

        var lines = comic.videos.split(/\n/);
        var texts = [];

        for (var i = 0; i < lines.length; i++) {
          if (/\S/.test(lines[i])) {
            texts.push($.trim(lines[i]));
          }
        }

        blueimp.Gallery(texts, $('#blueimp-gallery').data());
      });*/

      /*$('.video-gallery-button').on('click', function(event) {
        event.preventDefault();
        blueimp.Gallery([{
          title: 'LES TWINS - An Industry Ahead',
          href: 'http://www.youtube.com/watch?v=zv9jHNwaV2E',
          type: 'text/html',
          youtube: 'zv9jHNwaV2E',
          poster: 'http://img.youtube.com/vi/zv9jHNwaV2E/0.jpg'
        }], $('#blueimp-gallery').data());
      });*/

      $(document).tooltip();
    }
  },

  init: function() {
    MainContent.loadComics();
  }
};