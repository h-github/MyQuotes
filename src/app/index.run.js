(function () {
  'use strict';

  angular
    .module('myQuotes')
    .run(runBlock);


  function runBlock($rootScope, $location, $cookieStore, $http, $mdSidenav, $mdComponentRegistry, $log) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      $log.log('from', fromState.name, 'to', toState.name);
    });

   
  }
})();