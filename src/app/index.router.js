(function () {
  'use strict';

  angular.module('myQuotes')
    .config(['$stateProvider', '$urlRouterProvider', routeConfig]);

  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/',
        views: {
          '': {
            templateUrl: 'app/main/main.html',
            controller: 'MainController as vm'
          }, 'navbar@app': {
            templateUrl: 'app/components/navigation/navbar.view.html',
            controller: 'NavbarCtrl as vm'
          }
        }
      })
      .state('app.quotes', {
        url: '/quotes',
        views: {
          'main@app': {
            templateUrl: 'app/components/quotes/quotes.view.html',
            controller: 'QuotesController as vm'
          }
        }
      });



    //$urlRouterProvider.otherwise('/login');

    //$httpProvider.interceptors.push('APIInterceptor');
  }
}());