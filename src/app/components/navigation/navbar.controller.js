(function() {
    'use strict';
    angular.module('navigation')
        .controller('NavbarCtrl', ['facebookService', '$state', '$mdMedia', NavbarCtrl]);

    function NavbarCtrl(facebookService, $state, $mdMedia) {
        var vm = this;
        vm.user = null;

        vm.show = show;
        vm.userLogout = userLogout;
        vm.activation = activation;

        vm.activation();

        function activation($timeout) {}



        function show() {
            return $mdMedia('max-width: 1280px');
        }

        function userLogout() {
          facebookService.userLogout();
            $state.transitionTo('login');
        }

    }

}());