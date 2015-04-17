'use strict';

var Logout = {
  logout: function() {
    localStorage.setItem('logedin', 'false');

    Login.checkLogin();
  },
};