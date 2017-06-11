(function() {
    'use strict';

    angular.module('myQuotes').controller('MainController', MainController);


    function MainController(FacebookService,$timeout) {
        var vm = this;

        vm.name = 'MainController';
      vm.checkLogedin = checkLogedin;
      vm.activate = activate;
      vm.activate();

      function activate(){


      }

      function checkLogedin(){

      }
    }

}());