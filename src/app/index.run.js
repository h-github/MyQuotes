(function () {
  'use strict';

  angular
    .module('myQuotes')
    .run(['$rootScope', '$state', '$stateParams', '$log', runBlock]);


  function runBlock($rootScope, $state, $stateParams, $log) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      $log.log('from', fromState.name, 'to', toState.name);
      $log.log($stateParams);
    });

   
  }
})();