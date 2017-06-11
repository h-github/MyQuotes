/**
 * Created by hamid on 2017-06-08.
 */
(function(){
  'use strict';

  angular.module('myQuotes')
    .controller('QuotesController', QuotesController);

  function QuotesController(QuotesService, LocalStorage){
    var vm = this;
    //vm.newQuotes = [];
    //vm.postedQuotes = [];

    vm.name = 'QuotesController';
    vm.userId = LocalStorage.get('userID');
    vm.getNewQuetes = getNewQuetes;
    vm.postNewQuote = postNewQuote;
    vm.deleteNewQuote = deleteNewQuote;

    vm.getPostedQuotes = getPostedQuotes;



    function postNewQuote(quote) {

    }

    function deleteNewQuote(quote) {
      _.remove(vm.newQuotes, function (q) {
        return quote.userId === q.userId && quote.id === q.id;
      });
    }

    function getNewQuetes() {
      var newQuotes = QuotesService.getNewQuetes(vm.userId);
      return newQuotes;
    }

    function getPostedQuotes() {
      return QuotesService.getPostedQuetes(vm.userId);
    }
  }


}());