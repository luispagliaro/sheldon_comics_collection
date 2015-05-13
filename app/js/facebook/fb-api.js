window.fbAsyncInit = function() {
  FB.init({
    appId: '970080289669999',
    status: true,
    cookie: true,
    xfbml: true
  });

  /*FB.login(function() {
    FB.api('/me/accounts', 'get', {}, function(response) {
      console.log(response);
    });
  }, {
    scope: 'publish_actions'
  });

  FB.api('/me/feed', 'post', {
    message: 'hkhjk'
  }, function(response) {
    console.log(response);
  });

FB.Event.subscribe('auth.authResponseChange', function (response) {
  if (response.status === 'connected') {
    alert("Successfully connected to Facebook!");
  }
  else if (response.status === 'not_authorized') {
    alert("Login failed!");
  } else {
    alert("Unknown error!");
  }
});
*/
};
(function() {
  var e = document.createElement('script');
  e.async = true;
  e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
  document.getElementById('fb-root').appendChild(e);
}());
/*(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3&appId=970080289669999";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));*/