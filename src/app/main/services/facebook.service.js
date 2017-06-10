/**
 * Created by hamid on 2017-06-08.
 */
(function(){
  'use strict';
  angular.module('myQuotes')
    .factory('facebookService', facebookService);

  function facebookService ($q, $window, $rootScope) {
    var userIsLogedIn = true;
    var userName = '';

    var service = {
      initFacebook: initFacebook,
      injectFacebookSDK: injectFacebookSDK,
      login:login,
      logout: logout,
      isUserLogedin: isUserLogedin,
      checkUserLoging:checkUserLoging,
      getUserName:getUserName,
      getMyLastName: getMyLastName
    };
    return service;


    function initFacebook(){
      $window.fbAsyncInit = function() {
        FB.init({
          appId: '958545794286645',
          status: true,
          cookie: true,
          xfbml: true,
          version: 'v2.4'
        });
      };
    }

    function injectFacebookSDK(){
      var js, fjs = document.getElementsByTagName('script')[0];
      if (document.getElementById('facebook-jssdk')) {return;}
      js = document.createElement('script');
      js.id = 'facebook-jssdk';
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }



    function isUserLogedin(){
      FB.getLoginStatus(function(response) {
        if(response.status === 'connected'){
          userIsLogedIn = true;
        }else{
          userIsLogedIn = false;
        }
      });
    }

    function login(){
      FB.login(function(response) {
        if (response.authResponse) {
          userIsLogedIn = true;
          $rootScope.$broadcast('user-logged-in', {response : response});
          FB.api('/me', function(response) {
            userName = response.name;
          });
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      });
    }

    function logout(){
      FB.logout(function(response) {
        userIsLogedIn = false;
        userName = '';
        $rootScope.$broadcast('user-logged-out', {response : response});

      });
    }


    function checkUserLoging() {
      return userIsLogedIn;
    }

    function getUserName(){
      return userName;
    }

    function getMyLastName() {
      var deferred = $q.defer();
      FB.api('/me', {
        fields: 'last_name'
      }, function(response) {
        if (!response || response.error) {
          deferred.reject('Error occured');
        } else {
          deferred.resolve(response);
        }
      });
      return deferred.promise;
    }

  }

}());