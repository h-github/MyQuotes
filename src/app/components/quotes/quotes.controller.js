/**
 * Created by hamid on 2017-06-08.
 */
(function(){
  'use strict';

  angular.module('myQuotes')
    .controller('QuotesController', QuotesController);

  function QuotesController(){
    var vm = this;

    vm.name = 'QuotesController';
  }


}());