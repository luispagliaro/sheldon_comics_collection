'use strict';

var LogInOut = {
  setUserAndPass: function() {
    localStorage.setItem('user', 'fcfff28fdbbbf75face3b3d97fdbfc15');
    localStorage.setItem('pass', 'bdc87b9c894da5168059e00ebffb9077');
  },

  login: function() {
    $('#form-login').submit(function(event) {
      event.preventDefault();

      var user = '',
        pass = '';

      user = CryptoJS.MD5($('#input-user').val()).toString();
      pass = CryptoJS.MD5($('#input-pass').val()).toString();

      $('#dialog-login').modal('toggle');

      if ((localStorage.getItem('user') == user) && (localStorage.getItem('pass') == pass)) {
        localStorage.setItem('logedin', 'true');

        LogInOut.checkLogin();

        MainContent.showAlert('Welcome back, Dr. Sheldon Cooper.', '#alert-ok');

        LogInOut.reproduceSound('login');
      } else {
        localStorage.setItem('logedin', 'false');

        MainContent.showAlert('Username or password incorrect.', '#alert-fail');
      }
    });
  },

  logout: function() {
    localStorage.setItem('logedin', 'false');

    MainContent.showAlert('Good bye, Dr. Sheldon Cooper.', '#alert-ok');

    LogInOut.reproduceSound('logout');

    LogInOut.checkLogin();
  },

  reproduceSound: function(state) {
    var snd = {};

    if (state === 'login') {
      snd = new Audio('media/login.mp3');
    } else {
      snd = new Audio('media/logout.mp3');
    }

    snd.play();
  },

  checkLogin: function() {
    if (localStorage.getItem('logedin') == 'true') {
      Navigation.userLogedIn('logedin');
      MainContent.userLogedIn('logedin');
    } else {
      Navigation.userLogedIn('logedout');
      MainContent.userLogedIn('logedout');
    }
  },

  init: function() {
    LogInOut.setUserAndPass();
    LogInOut.login();
    LogInOut.checkLogin();
  }
};