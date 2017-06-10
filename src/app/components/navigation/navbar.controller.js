(function() {
    'use strict';
    angular.module('myQuotes')
        .controller('NavbarCtrl', ['facebookService', '$state', '$timeout','$scope', NavbarCtrl]);

    function NavbarCtrl(facebookService, $state, $timeout,$scope) {
        var vm = this;
        vm.user = null;
        vm.isUserLogedin = false;
        vm.checkUserLoging = checkUserLoging;
        vm.FBLogin = FBLogin;
        vm.FBLogout = FBLogout;
        // vm.userLogout = userLogout;
        vm.activation = activation;
        vm.getUserName = getUserName;
        vm.activation();

      $scope.$on('user-logged-in', function(event, args) {
        vm.isUserLogedin = (args.response.status === 'connected');
        console.log('User logged in and fully authorize.', args);
      });

      $scope.$on('user-logged-out', function(event, args) {
          vm.isUserLogedin = (args.response.status === 'connected');
        console.log('User logged out and is not authorize.', args);
      });
        function activation() {
          facebookService.initFacebook();
          facebookService.injectFacebookSDK();
          $timeout(function () {
            facebookService.isUserLogedin();
          },1000);
        }

        function checkUserLoging() {
          vm.isUserLogedin = facebookService.checkUserLoging();
        }

        // function userLogout() {
        //   facebookService.userLogout();
        //     $state.transitionTo('login');
        // }

        function FBLogin(){
          facebookService.login();
          // $timeout(function () {
          //   facebookService.isUserLogedin();
          // },1500);
        }
        
        function FBLogout() {
          facebookService.logout();
          // $timeout(function () {
          //   facebookService.isUserLogedin();
          // },1500);
        }

        function getUserName(){
          return facebookService.getUserName();
        }
    }

}());