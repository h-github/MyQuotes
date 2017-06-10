(function() {
    'use strict';

    angular
        .module('myQuotes')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['facebookService', '$timeout','$state'];

    function LoginController(facebookService,$timeout,$state) {
        var vm = this;
        vm.isLogedin = false;
        vm.checkLogedin = checkLogedin;
      vm.activate = activate;

      vm.activate();

      function activate(){
        facebookService.initFacebook();
        facebookService.injectFacebookSDK();
        vm.checkLogedin();
      }

      function checkLogedin(){
        $timeout(function(){
          var response = facebookService.userIsLogin();
            if(response){
              $state.go('app.quotes');
            }
        }, 1000);

      }
    }

})();