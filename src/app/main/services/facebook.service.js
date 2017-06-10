/**
 * Created by hamid on 2017-06-08.
 */
(function(){
  'use strict';
  angular.module('myQuotes')
    .factory('facebookService', facebookService);

  function facebookService ($q, $window, $timeout) {
    var service = {
      initFacebook: initFacebook,
      injectFacebookSDK: injectFacebookSDK,
      userIsLogin: userIsLogin,
      userLogout: userLogout,
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

    function userIsLogin(){
      var deferred = $q.defer();
      FB.getLoginStatus(function(response) {
        if(response.status === 'connected'){
          deferred.resolve(response);
        }else{
          deferred.reject('Error occured');
        }
      });
    }

    function userLogout(){
      FB.logout(function(response) {
        // Person is now logged out
      });
    }


  }

}());