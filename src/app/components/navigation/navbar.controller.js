(function () {
  'use strict';
  angular.module('myQuotes')
    .controller('NavbarCtrl', ['facebookService', '$state', '$timeout', '$scope', NavbarCtrl]);

  function NavbarCtrl(facebookService, $state, $timeout, $scope) {
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

      facebookService.getMyLastName().then(function (name) {
        vm.greeting = name.first_name ? 'Hi ' + name.first_name + '!' : '';
      });
      console.log('User logged in and fully authorize.', args);
      $state.go('app.quotes');
    });

    $scope.$on('user-logged-out', function (event, args) {
      vm.isUserLogedin = (args.response.status === 'connected');
      vm.greeting = '';
      $scope.$apply();
      console.log('User logged out and is not authorize.', args);
    });

    function activation() {
      facebookService.initFacebook();
      facebookService.injectFacebookSDK();
      $timeout(function () {
        vm.getGreetingMessage();
      }, 1500);
    }

    function checkUserLoging() {
      facebookService.isUserLogedin();
      vm.isUserLogedin = facebookService.checkUserLoging();
      if (vm.isUserLogedin) {
      }
    }

    // function userLogout() {
    //   facebookService.userLogout();
    //     $state.transitionTo('login');
    // }

    function FBLogin() {
      vm.checkUserLoging()
      if (!vm.isUserLogedin) {
        facebookService.login();
      }
      // $timeout(function () {
      //   facebookService.isUserLogedin();
      // },1500);
    }

    function FBLogout() {
      if (vm.isUserLogedin) {
        facebookService.logout();
      }
      // $timeout(function () {
      //   facebookService.isUserLogedin();
      // },1500);
    }

    function getGreetingMessage() {
      facebookService.getMyLastName().then(function (name) {
        vm.greeting = name.first_name ? 'Hi ' + name.first_name + '!' : '';
      });
     }
  }

}());