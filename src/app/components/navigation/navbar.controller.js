(function () {
  'use strict';
  angular.module('myQuotes')
    .controller('NavbarCtrl', ['facebookService', '$state', '$timeout', '$scope', NavbarCtrl]);

  function NavbarCtrl(facebookService, $state, $timeout, $scope, $window) {
    var vm = this;
    vm.greeting = '';
    vm.isUserLogedin = false;
    //vm.checkUserLoging = checkUserLoging;
    //vm.FBLogin = FBLogin;
    //vm.FBLogout = FBLogout;
    // vm.userLogout = userLogout;
    vm.activation = activation;
    vm.getGreetingMessage = getGreetingMessage;
    vm.activation();
    

    function activation() {
      facebookService.initFacebook();
      facebookService.injectFacebookSDK();
    }

    //function checkUserLoging() {
    //  facebookService.isUserLogedin();
    //  vm.isUserLogedin = facebookService.checkUserLoging();
    //  if (vm.isUserLogedin) {
    //  }
    //}

    // function userLogout() {
    //   facebookService.userLogout();
    //     $state.transitionTo('login');
    // }

    //function FBLogin() {
    //  vm.checkUserLoging()
    //  if (!vm.isUserLogedin) {
    //    facebookService.login();
    //  }
    //  // $timeout(function () {
    //  //   facebookService.isUserLogedin();
    //  // },1500);
    //}

    //function FBLogout() {
    //  if (vm.isUserLogedin) {
    //    facebookService.logout();
    //  }
    //  // $timeout(function () {
    //  //   facebookService.isUserLogedin();
    //  // },1500);
    //}

    function getGreetingMessage() {
      var msg = facebookService.getUserName();
      vm.greeting = msg ? 'Hi ' + msg + '!' : '';
     }

    function getGreetingMessage() {
      return facebookService.getUserName();
    }
  }

}());