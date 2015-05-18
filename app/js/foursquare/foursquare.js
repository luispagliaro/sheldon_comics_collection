'use strict';

/**
 * Module containing all the functionality related to Foursquare.
 * @type {Object}
 */
var Foursquare = {
  /**
   * Checks if the list 'Sheldon's Comics' is created.
   */
  checkList: function() {
    /** @type {String} Foursquare access token. */
    var token = hello('foursquare').getAuthResponse().access_token;

    /** @type {String} Foursquare user ID. */
    var userId = '';

    /** @type {Array} Foursquare user lists. */
    var lists = [];

    /** @type {String} Foursquare 'Sheldon's Comics' list ID. */
    var listId = '';

    /**
     * Sets the 'Sheldon's Comics' list ID in local storage.
     */
    function setListId() {
      localStorage.setItem('fsListId', listId);
    }

    /**
     * Searches for the 'Sheldon's Comics' list.
     */
    function searchList() {
      /** @type {Number} Variable that augments if the 'Sheldon's Comics' list exists. */
      var exists = 0;

      /**
       * Checks all the users lists to see if 'Sheldon's Comics' list exists.
       */
      $.each(lists, function(index, el) {
        if (el.name === 'Sheldon\'s Comics') {
          // Augments the 'exist' variable.
          exists++;

          // Saves the list ID.
          listId = el.id;

          // Calls the 'setListId' function to save the list ID in local storage.
          setListId();
        }
      });

      // If the 'Sheldon's Comics' list doesn't exist, it is created.
      if (exists === 0) {
        $.ajax({
          type: 'POST',
          url: 'https://api.foursquare.com/v2/lists/add?oauth_token=' + token + '&client_id=PJGJ33BJMRIPCEQ2GHZICEMDNAPMI3Y5QKCO3Z0TK133H5CD&client_secret=VWYEN4DM5A04OAPQKS5R4DYN4GELHHLC0W3AUFRTV102XOVJ&v=20140806&m=foursquare&name=Sheldon\'s Comics',
          success: function(data) {
            // Saves the list ID.
            listId = data.response.list.id;

            // Calls the 'setListId' function to save the list ID in local storage.
            setListId();
          }
        });
      }
    }

    /**
     * Gets the user lists.
     */
    hello('foursquare').api('me').then(function(json) {
      // Sets the user ID.
      userId = json.id;

      // Gets the user lists.
      $.ajax({
        type: 'GET',
        url: 'https://api.foursquare.com/v2/users/' + userId + '/lists?oauth_token=' + token + '&client_id=PJGJ33BJMRIPCEQ2GHZICEMDNAPMI3Y5QKCO3Z0TK133H5CD&client_secret=VWYEN4DM5A04OAPQKS5R4DYN4GELHHLC0W3AUFRTV102XOVJ&v=20140806&m=foursquare',
        success: function(data) {
          // Saves the list.
          lists = data.response.lists.groups[0].items;

          // Calls the 'searchList' function to check if the 'Sheldon's Comics' list exists.
          searchList();
        }
      });
    });
  },

  /**
   * Adds a venue to the 'Sheldon's Comics' list.
   * @param {String} idVenue Foursquare venue ID.
   */
  addVenueToList: function(idVenue) {
    /** @type {String} Foursquare venue ID */
    var listId = localStorage.getItem('fsListId');

    /** @type {String} Foursquare access token. */
    var token = hello('foursquare').getAuthResponse().access_token;

    // Saves the venue in the 'Sheldon's Comics' list.
    $.ajax({
      type: 'POST',
      url: 'https://api.foursquare.com/v2/lists/' + listId + '/additem?oauth_token=' + token + '&client_id=PJGJ33BJMRIPCEQ2GHZICEMDNAPMI3Y5QKCO3Z0TK133H5CD&client_secret=VWYEN4DM5A04OAPQKS5R4DYN4GELHHLC0W3AUFRTV102XOVJ&v=20140806&m=foursquare&venueId=' + idVenue
    });
  }
};