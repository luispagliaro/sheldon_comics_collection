'use strict';

var MainContent = {
  loadComics: function() {
    if (Controller.comics !== []) {
      $('#comics-collection').empty();

      $.each(Controller.comics, function(index, comic) {
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

        var comicItem = '';

        comicItem += '<div id="' + comic.id + '" class="comic-item col-xs-6 col-sm-4 col-md-3">';
        comicItem += '<h4>' + title + '</h4>';
        comicItem += '<span class="label label-success" title="Genre">' + Controller.getGenre(comic.idGenre).name + '</span> ';
        comicItem += '<span class="badge" title="Quantity">' + comic.quantity + itemLabel + '</span>';
        comicItem += '<span class="glyphicon glyphicon-remove-circle pull-right" title="Remove comic" aria-hidden="true"></span>';
        comicItem += '<span class="glyphicon glyphicon-edit pull-right" title="Modify comic" aria-hidden="true" data-toggle="modal" data-target="#dialog-add-comic"></span>';
        comicItem += '<div class="thumbnail">';
        comicItem += '<img src="' + comic.images[0] + '" class="img-responsive" alt="' + comic.description + '"/>';
        comicItem += '<p class="caption">' + comic.description + '</p>';
        comicItem += '<button class="btn btn-default btn-sm image-gallery-button" title="Image gallery" type="button" id="igallery-' + comic.id + '">';
        comicItem += '<i class="glyphicon glyphicon-picture"></i>';
        comicItem += '</button>';
        comicItem += '<button id="vgallery-' + comic.id + '" title="Video gallery" type="button" class="btn btn-default btn-sm video-gallery-button">';
        comicItem += '<i class="glyphicon glyphicon-film"></i>';
        comicItem += '</button>';
        comicItem += '<a id="share-' + comic.id + '" class="btn btn-social btn-xs btn-vk btn-share">';
        comicItem += '<i class="fa fa-facebook"></i>Share';
        comicItem += '</a>';
        comicItem += '</div>';
        comicItem += '</div>';

        $('#comics-collection').append(comicItem);

        /*fb comments 

        <a id=\'comments-' + comic.id + '\' class=\'btn btn-social btn-xs btn-vk btn-comments\' data-toggle=\'modal\' data-target=\'#fb-comments-modal-' + comic.id + '\'><i class=\'fa fa-facebook\'></i>Comments</a>

        $('body').append('<div class="modal fade modal-fb" id="fb-comments-modal-' + comic.id + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><div id="fb-comments-' + comic.id + '" href-data="http://www.matvey.com.ar/comics/index.html/?comments-' + comic.id + '" class="fb-comments" data-width="600" data-numposts="5" data-colorscheme="light"></div></div></div></div></div>');*/

        if (comic.name.length > 20) {
          $('.comic-item[id=' + comic.id + '] h4').attr('title', comic.name);
        }
      });

      $(document).tooltip();

      LogInOut.checkLogin();
    }
  },

  imageVideoGallery: function() {
    $('.image-gallery-button').on('click', function(event) {
      event.preventDefault();

      var a = [];

      var comic = MainContent.getComic($(this));

      blueimp.Gallery(comic.images, $('#blueimp-gallery').data());
    });

    $('.video-gallery-button').on('click', function(event) {
      event.preventDefault();

      var a = [];

      var comic = MainContent.getComic($(this));

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
    $('.btn-share').on('click', function(e) {
      e.preventDefault();

      var comic = MainContent.getComic($(this));

      FB.ui({
        method: 'feed',
        name: comic.name,
        link: 'http://www.matvey.com.ar/comics/index.html#share-' + comic.id,
        picture: '',
        caption: Controller.getGenre(comic.idGenre).name,
        description: comic.description,
        message: ''
      });
    });
  },

  userLogedIn: function(status) {
    if (status === 'logedin') {
      MainContent.modifyComic();

      $('.comic-item').each(function() {
        $(this).hover(function() {
          $(this).find('.glyphicon-remove-circle').fadeIn(500);
          $(this).find('.glyphicon-edit').fadeIn(500);
        }, function() {
          $(this).find('.glyphicon-remove-circle').fadeOut(500);
          $(this).find('.glyphicon-edit').fadeOut(500);
        });
      });
    } else {
      $('.comic-item').unbind('mouseenter mouseleave');
      $('.glyphicon-remove-circle').hide();
      $('.glyphicon-edit').hide();
    }
  },

  deleteComic: function() {
    $('.glyphicon-remove-circle').on('click', function() {
      var comic = MainContent.getComic($(this).closest('div'));

      var comics = Controller.getComics();

      comics = $.grep(comics, function(e) {
        return e.id != comic.id;
      });

      Controller.setComics(comics);

      $(this).closest('div').hide(500, function() {
        $(this).remove();
      });

      MainContent.showAlert('Comic deleted successfully.', '#alert-ok');
    });
  },

  modifyComic: function() {
    $('.glyphicon-edit').on('click', function() {
      FormComic.setFormModifyComic();

      var comic = MainContent.getComic($(this).closest('div'));

      FormComic.loadComicData(comic.id, comic.name, comic.idGenre, comic.description, comic.quantity, comic.videos);
    });
  },

  /*fbComments: function() {
    $('.btn-comments').on('click', function(e) {
      e.preventDefault();

      var id = $(this).attr('id');
      id = id.substr((id.length - 1), 1);

      $('#fb-comments-modal-' + id + '').remove();


    });
  },*/

  getComic: function(el) {
    var id = el.attr('id');

    if (id.indexOf('-') !== -1) {
      id = id.substr(id.indexOf('-') + 1, id.length - 1);
    }

    return Controller.getComic(id);
  },

  showAlert: function(message, selector) {
    $(selector).text(message);

    $(selector).fadeIn(1000, function() {
      $(selector).delay(1500).fadeOut(3000);
    });
  },

  init: function() {
    MainContent.loadComics();
    MainContent.imageVideoGallery();
    MainContent.shareOnFB();
    MainContent.deleteComic();
    MainContent.modifyComic();
    //MainContent.fbComments();
  }
};