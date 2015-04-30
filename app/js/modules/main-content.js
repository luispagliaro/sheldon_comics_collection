'use strict';

/**
 * Module containing all functionality related to the main content of the page.
 * @type {Object}
 */
var MainContent = {
  /**
   * Loads all the comics in the main page.
   */
  loadComics: function() {
    // Checks if there are any comics added.
    if (Controller.comics.length !== 0) {
      // Removes any previous comics loaded.
      $('#comics-collection').empty();

      /**
       * Takes a comic from the comics collection to create its element to be shown in the main page.
       */
      $.each(Controller.comics, function(index, comic) {
        /** @type {String} Label for the quantity of items available. */
        var itemLabel = '',
          /** @type {String} Name of the comic. */
          title = '',
          /** @type {String} [description] */
          comicItem = '';

        // Checks the quantity to set the proper item label.
        if (comic.quantity == 1) {
          itemLabel = ' item';
        } else {
          itemLabel = ' items';
        }

        // Checks if the name of the comic is too long.
        if (comic.name.length > 20) {
          // Cuts the string to 20 characters and adds suspensive dots as the comic title.
          title = comic.name.substr(0, 20) + '...';
        } else {
          title = comic.name;
        }

        // Creates the div element for the comic.
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

        // Adds the div element for the comic to the main content.
        $('#comics-collection').append(comicItem);

        // If the name of the comic is grater than 20 character a title with the full name is added so as when hovering it a tooltip with the full name is shown.
        if (comic.name.length > 20) {
          $('.comic-item[id=' + comic.id + '] h4').attr('title', comic.name);
        }

        /*fb comments 

        <a id=\'comments-' + comic.id + '\' class=\'btn btn-social btn-xs btn-vk btn-comments\' data-toggle=\'modal\' data-target=\'#fb-comments-modal-' + comic.id + '\'><i class=\'fa fa-facebook\'></i>Comments</a>

        $('body').append('<div class="modal fade modal-fb" id="fb-comments-modal-' + comic.id + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><div id="fb-comments-' + comic.id + '" href-data="http://www.matvey.com.ar/comics/index.html/?comments-' + comic.id + '" class="fb-comments" data-width="600" data-numposts="5" data-colorscheme="light"></div></div></div></div></div>');*/
      });

      // Adds the jQuery UI tooltip.
      $(document).tooltip();

      // Calls the 'imageVideoGallery' function to create the image and video gallery for each comic.
      MainContent.imageVideoGallery();

      // Calls the 'shareOnFB' function to create the Facebook sharer for each comic.
      MainContent.shareOnFB();

      // Calls the 'addComicsToSearch' to fill the autocomplete for the search input.
      Navigation.addComicsToSearch();

      // Calls the 'checkLogin' function to add functionality that is only available when the user is loged in.
      LogInOut.checkLogin();
    }
  },

  /**
   * Creates the image and video gallery for each comic.
   */
  imageVideoGallery: function() {
    /**
     * Binds the on click event to the image and video gallery buttons .
     */
    $('.image-gallery-button').on('click', function(event) {
      // Prevents default actions.
      event.preventDefault();

      /** @type {Object} A comic. */
      var comic = MainContent.getComic($(this));

      // Loads the images in the gallery for the comic selected.
      blueimp.Gallery(comic.images, $('#blueimp-gallery').data());
    });

    /**
     * Binds the on click event to the image and video gallery buttons .
     */
    $('.video-gallery-button').on('click', function(event) {
      // Prevents default actions.
      event.preventDefault();

      /** @type {Object} A comic. */
      var comic = MainContent.getComic($(this));

      /** @type {String} Creates new array with the videos URLs. */
      var lines = comic.videos.split(/\n/);

      /** @type {Array} Array to store the videos URLs. */
      var urls = [];

      /** @type {Array} Videos for the video gallery. */
      var videos = [];

      // Checks every URL to see if there are whitespaces and adds them to the url array.
      for (var i = 0; i < lines.length; i++) {
        if (/\S/.test(lines[i])) {
          urls.push($.trim(lines[i]));
        }
      }

      /**
       * Creates the video objects needed for the video gallery.
       */
      $.each(urls, function(index, url) {
        /** @type {Object} A video gallery object. */
        var video = {
          href: url,
          type: 'text/html',
          youtube: url.split('watch?v=')[1],
          poster: 'http://img.youtube.com/vi/' + url.split('watch?v=')[1] + '/0.jpg'
        };

        // Adds the video object to the videos array.
        videos.push(video);
      });

      // Loads the videos in the gallery for the comic selected.
      blueimp.Gallery(videos, $('#blueimp-gallery').data());
    });
  },

  /**
   * Creates the Facebook sharer.
   */
  shareOnFB: function() {
    /**
     * Binds the on click event to the Facebook buttons.
     */
    $('.btn-share').on('click', function(e) {
      // Prevents default actions.
      e.preventDefault();

      /** @type {Object} A comic */
      var comic = MainContent.getComic($(this));

      // Creates the Facebook sharer object.
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

  /**
   * Sets the settings for when the user is loged in or not.
   * @param  {String} status Status logedin or not logedin
   */
  userLogedIn: function(status) {
    // Checks the status of the user
    if (status === 'logedin') {
      // Shows a text to the user to add comics.
      $('#add-comic-text').show();

      // Calls the 'modifyComic' function to add the functionality to modifying comics.
      MainContent.modifyComic();

      // Calls the 'deleteComic' function to add the functionality to delete comics.
      MainContent.deleteComic();

      /**
       * Adds the buttons for modify or delete a comic.
       */
      $('.comic-item').each(function() {
        /** @type {Object} A div element of a comic. */
        var el = $(this);

        /**
         * Binds the on hover event to the comic for the buttons to modify or delete a comic.
         */
        el.hover(function() {
          el.find('.glyphicon-remove-circle').fadeIn(500);
          el.find('.glyphicon-edit').fadeIn(500);
        }, function() {
          el.find('.glyphicon-remove-circle').fadeOut(500);
          el.find('.glyphicon-edit').fadeOut(500);
        });
      });
    } else {
      // Removes the text fot adding comics.
      $('#add-comic-text').hide();

      // Unbinds the mouseenter mouseleave events of the buttons for modifying or deleting a comic.
      $('.comic-item').unbind('mouseenter mouseleave');

      // Hides the buttons for modifying or deleting a comic.
      $('.glyphicon-remove-circle').hide();
      $('.glyphicon-edit').hide();
    }
  },

  /**
   * Deletes a comic.
   */
  deleteComic: function() {
    /**
     * Binds the on click event to the buttons for deleting a comic.
     */
    $('.glyphicon-remove-circle').on('click', function() {
      /** @type {Object} A div element of a comic. */
      var el = $(this);

      /** @type {Object} A comic */
      var comic = MainContent.getComic(el.closest('div'));

      /** @type {Array} All the comics */
      var comics = Controller.getComics();

      // Deletes the selected comic.
      comics = $.grep(comics, function(e) {
        return e.id !== comic.id;
      });

      // Saves the changes.
      Controller.setComics(comics);

      // Removes the div comic from the main content.
      el.closest('div').hide(500, function() {
        el.remove();
      });

      // Calls the 'showAlert' function to shows an alert to the user.
      MainContent.showAlert('Comic deleted successfully.', '#alert-ok');
    });
  },

  /**
   * Modifies a comic.
   */
  modifyComic: function() {
    /**
     * Binds the on click event to the buttons for modifying a comic.
     */
    $('.glyphicon-edit').on('click', function() {
      // Calls the 'setFormModifyComic' function to set the form for modifying a comic.
      FormComic.setFormModifyComic();

      /** @type {Object} A comic */
      var comic = MainContent.getComic($(this).closest('div'));

      // Calls the function 'loadComicData' to save the changes.
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

  /**
   * Gets a comic from an element ID.
   * @param  {Object} el Element from which to take the ID
   * @return {Object}    A comic object
   */
  getComic: function(el) {
    /** @type {String} ID of the element. */
    var id = el.attr('id');

    // Gets the number of the ID.
    if (id.indexOf('-') !== -1) {
      id = id.substr(id.indexOf('-') + 1, id.length - 1);
    }

    // Gets the comic needed and returns it.
    return Controller.getComic(id);
  },

  /**
   * Shows an alert to the user
   * @param  {String} message  Message of the alert
   * @param  {String} selector CSS selector
   */
  showAlert: function(message, selector) {
    /** @type {Object} The alert element. */
    var el = $(selector);

    // Adds the message to the alert.
    el.text(message);

    // Displays the alert.
    el.fadeIn(1000, function() {
      el.delay(1500).fadeOut(3000);
    });
  },

  /**
   * Initialization of the MainContent module function.
   */
  init: function() {
    MainContent.loadComics();
    //MainContent.fbComments();
  }
};