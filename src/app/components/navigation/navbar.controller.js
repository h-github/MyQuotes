(function () {
  'use strict';
  angular.module('myQuotes')
    .controller('NavbarCtrl', ['FacebookService', '$state', '$timeout', '$scope','$log', NavbarCtrl]);

  function NavbarCtrl(FacebookService, $state, $timeout, $scope, $log) {
    var vm = this;
    vm.greeting = '';
    vm.isUserLogedin = false;
    vm.checkUserLoging = checkUserLoging;
    vm.FBLogin = FBLogin;
    vm.FBLogout = FBLogout;
    // vm.userLogout = userLogout;
    vm.activation = activation;
     vm.getGreetingMessage = getGreetingMessage;
    vm.activation();

    $scope.$on('user-logged-in', function (event, args) {
      vm.isUserLogedin = (args.response.status === 'connected');

      FacebookService.getMyLastName().then(function (name) {
        vm.greeting = name.first_name ? 'Hi ' + name.first_name + '!' : '';   // jshint ignore:line
      });
      //$log.log('User logged in and fully authorize.', args);
      $state.go('app.quotes');
    });

    $scope.$on('user-logged-out', function (event, args) {
      vm.isUserLogedin = (args.response.status === 'connected');
      vm.greeting = '';
      $scope.$apply();
      //$log.log('User logged out and is not authorize.', args);
    });

    function activation() {
      FacebookService.initFacebook();
      FacebookService.injectFacebookSDK();
      $timeout(function () {
        vm.checkUserLoging();
        vm.getGreetingMessage();
      }, 1500);
    }

    function checkUserLoging() {
      FacebookService.isUserLogedin();
      vm.isUserLogedin = FacebookService.checkUserLoging();
      if (vm.isUserLogedin) {
        $state.go('app.quotes');
      }
    }

    // function userLogout() {
    //   FacebookService.userLogout();
    //     $state.transitionTo('login');
    // }

    function FBLogin() {
      vm.checkUserLoging();
      if (!vm.isUserLogedin) {
        FacebookService.login();

      }
      // $timeout(function () {
      //   FacebookService.isUserLogedin();
      // },1500);
    }

    function FBLogout() {
      if (vm.isUserLogedin) {
        FacebookService.logout();
      }
      // $timeout(function () {
      //   FacebookService.isUserLogedin();
      // },1500);
    }

    function getGreetingMessage() {
      FacebookService.getMyLastName().then(function (name) {
        vm.greeting = name.first_name ? 'Hi ' + name.first_name + '!' : '';   // jshint ignore:line
      });
     }
  }

}());