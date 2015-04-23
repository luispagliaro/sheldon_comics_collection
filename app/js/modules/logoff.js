'use strict';

var Logout = {
  logoff: function() {
    localStorage.setItem('logedin', 'false');

    Login.checkLogin();
  },
};