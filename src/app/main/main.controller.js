(function () {
  'use strict';

  angular.module('myQuotes').controller('MainController', MainController);


  function MainController(FacebookService, $state) {
    var vm = this;

    vm.name = 'MainController';
    vm.state = $state;
    vm.checkLogedin = checkLogedin;
    vm.activate = activate;
    vm.activate();

    function activate() {


    }

    function checkLogedin() {

    }
  }

}());