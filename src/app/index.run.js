(function () {
  'use strict';

  angular
    .module('myQuotes')
    .run(runBlock);


  function runBlock($rootScope, $location, $cookieStore, $http, $mdSidenav, $mdComponentRegistry) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      console.log('from', fromState.name, 'to', toState.name);
    });

   
  }
})();