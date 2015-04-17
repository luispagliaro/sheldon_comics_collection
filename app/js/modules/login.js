'use strict';

var Login = {
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

        Login.checkLogin();

        $('#alert-login-ok').fadeIn(1000, function() {
          $('#alert-login-ok').delay(1500).fadeOut(3000);
        });
      } else {
        localStorage.setItem('logedin', 'false');

        $('#alert-login-fail').fadeIn(1000, function() {
          $('#alert-login-fail').delay(1500).fadeOut(3000);
        });
      }
    });
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
    Login.setUserAndPass();
    Login.login();
    Login.checkLogin();
  }
};