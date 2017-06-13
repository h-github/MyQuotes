/**
 * Created by hamid on 2017-06-08.
 */
(function(){
  'use strict';

  angular.module('myQuotes')
    .controller('QuotesController', QuotesController);

  function QuotesController(QuotesService, LocalStorage, FacebookService){
    var vm = this;

    function Quote(userId, content, author, dateCreated, datePosted) {
      this.userId = userId;
      this.content = content;
      this.author = author;
      this.dateCreated = dateCreated;
      this.datePosted = datePosted;
    }

    vm.newQuote = new Quote();

    vm.name = 'QuotesController';
    vm.userId = LocalStorage.get('userID');
    vm.getNewQuetes = getNewQuetes;
    vm.postNewQuote = postNewQuote;
    vm.deleteNewQuote = deleteNewQuote;

    vm.getPostedQuotes = getPostedQuotes;
    vm.activeCancelBtn = activeCancelBtn;
    vm.addNewQuote = addNewQuote;
    vm.cancelNewQuote = cancelNewQuote;


    function postNewQuote(quote) {
      FacebookService.postQuote(quote);
    }

    function deleteNewQuote(quote) {
      QuotesService.deleteQuote(quote);
    }

    function getNewQuetes() {
      var newQuotes = QuotesService.getNewQuetes(vm.userId);
      return newQuotes;
    }

    function getPostedQuotes() {
      return QuotesService.getPostedQuetes(vm.userId);
    }

    function cancelNewQuote() {
      vm.newQuote = new Quote();
      vm.quoteForm.$setPristine();
      vm.quoteForm.$setUntouched();
    }

    function activeCancelBtn() {
      return !!vm.newQuote.content || !!vm.newQuote.author;
    }

    function addNewQuote(newQuote) {
      if (!newQuote.content) {
        return false;
      }
      QuotesService.addNewQuote(newQuote);
      vm.newQuote = new Quote();
    }
  }


}());