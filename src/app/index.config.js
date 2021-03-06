(function () {
  'use strict';

  angular.module('myQuotes')
    .config(function ($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey', {
          'default': '200', // by default use shade 400 from the pink palette for primary intentions
          'hue-1': '300', // use shade 100 for the <code>md-hue-1</code> class
          'hue-2': '400', // use shade 600 for the <code>md-hue-2</code> class
          'hue-3': '500' // use shade 600 for the <code>md-hue-2</code> class

        })
        // If you specify less than all of the keys, it will inherit from the
        // default shades
        .accentPalette('amber', {
          'default': '500' // use shade 200 for default, and keep all other shades the same
        })
        .warnPalette('red')
        .backgroundPalette('grey');
    })
    .config(['$locationProvider', function ($locationProvider) {
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
    }]);
}());