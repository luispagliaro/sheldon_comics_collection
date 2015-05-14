'use strict';

/**
 * Module containing all functionality related to the login/out action.
 * @type {Object}
 */
var LogInOut = {
  /**
   * Sets the user and pass MD5 encrypted string in local storage.
   */
  setUserAndPass: function() {
    localStorage.setItem('user', 'fcfff28fdbbbf75face3b3d97fdbfc15');
    localStorage.setItem('pass', 'bdc87b9c894da5168059e00ebffb9077');
  },

  /**
   * Logs the user in.
   */
  login: function() {
    /**
     * Binds the submit event to the form 'form-login' element.
     */
    $('#form-login').submit(function(event) {
      // Prevents any default action.
      event.preventDefault();

      /** @type {String} User. */
      var user = '',
        /** @type {String} Password. */
        pass = '';

      // Gets the user and password from the inputs and converts them to an MD5 encrypted string.
      user = CryptoJS.MD5($('#input-user').val()).toString();
      pass = CryptoJS.MD5($('#input-pass').val()).toString();

      // Closes the log in form.
      $('#dialog-login').modal('toggle');

      // Checks if the user and password entered are correct.
      if ((localStorage.getItem('user') == user) && (localStorage.getItem('pass') == pass)) {
        // Sets the user as loged in in local storage.
        localStorage.setItem('logedin', 'true');

        // Calls the 'checkLogin' function to load the proper content.
        LogInOut.checkLogin();

        // Shows an alert to the user.
        MainContent.showAlert('Welcome, Dr. Sheldon Cooper.', '#alert-ok');

        // Calls the 'reproduceSound' function to reproduce the log in sound.
        LogInOut.reproduceSound('login');
      } else {
        // Sets the user as not loged in.
        localStorage.setItem('logedin', 'false');

        // Shows an alert to the user.
        MainContent.showAlert('Username or password incorrect.', '#alert-fail');
      }
    });
  },

  /**
   * Logs the user out.
   */
  logout: function() {
    // Sets the user as loged out in local storage.
    localStorage.setItem('logedin', 'false');

    // Shows an alert to the user.
    MainContent.showAlert('Good bye, Dr. Sheldon Cooper.', '#alert-ok');

    // Calls the 'reproduceSound' function to reproduce the log in sound.
    LogInOut.reproduceSound('logout');

    // Calls the 'checkLogin' function to load the proper content.
    LogInOut.checkLogin();
  },

  /**
   * Reproduces a sound.
   * @param  {String} state Status logedin or not logedin.
   */
  reproduceSound: function(state) {
    /** @type {Object} Audio object */
    var snd = {};

    // Checks if the user is logging in or logging out and creates the the corresponding audio object.
    if (state === 'login') {
      snd = new Audio('media/login.mp3');
    } else {
      snd = new Audio('media/logout.mp3');
    }

    // Reproduces the audio file.
    snd.play();
  },

  /**
   * Sets the setting according to if the user is loged in or not.
   */
  checkLogin: function() {
    // Checks if the user is loged in or not and calls the functions to set the corresponding settings.
    if (localStorage.getItem('logedin') == 'true') {
      Navigation.userLogedIn('logedin');
      MainContent.userLogedIn('logedin');
    } else {
      Navigation.userLogedIn('logedout');
      MainContent.userLogedIn('logedout');
    }
  },

  /**
   * Checks if the user has sign in to a social network.
   * @param  {String} network Current social network.
   * @param  {Object} el      li 'social-login' element clicked.
   * @return {[type]}         Social network status.
   */
  checkSignIn: function(network, el) {
    /** @type {String} ID of the li 'social-login' element clicked. */
    var id = el.id;

    /**
     * Checks if the social network session is loged in or expired.
     * @param  {Object} session   The current social network session.
     * @return {Boolean or Null}  Status of the current session.
     */
    function online (session) {
      /** @type {Date} Current time. */
      var currentTime = (new Date()).getTime() / 1000;

      return session && session.access_token && session.expires > currentTime;
    }

    /** @type {Object} The current network session. */
    var on = hello(network).getAuthResponse();

    return online(on) ? true : false;
  },

  /**
   * Initialization of the LogInOut module function.
   */
  init: function() {
    LogInOut.setUserAndPass();
    LogInOut.login();
    LogInOut.checkLogin();
  }
};