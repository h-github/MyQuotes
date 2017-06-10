(function() {
    'use strict';

    angular.module('myQuotes').controller('MainController', MainController);


    function MainController() {
        var vm = this;

        vm.name = 'MainController';
        vm.activate = activate;
      vm.activate();

      function activate(){
      }

    }

}());