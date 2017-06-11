(function () {
  'use strict';

  angular.module('myQuotes')
    .service('StorageAccessor', StorageAccessor)
    .service('LocalStorage', LocalStorage);

  function StorageAccessor($window) {
    var service = {
      getLocalStorage: getLocalStorage,
      getSessionStorage: getSessionStorage
    };

    return service;

    function getLocalStorage() {
      return $window.localStorage;
    }

    function getSessionStorage() {
      return $window.sessionStorage;
    }
  }

  function LocalStorage(StorageAccessor, $cookies) {

    // Make sure Local Storage is Available on Browser
    var localStorage = getLocalStorage();
    var sessionStorage = getSessionStorage();

    var service = {
      set: set,
      get: get,
      remove: remove
    };

    return service;

    function set(key, value, isSession) {
      if (isSession) {
        sessionStorage.setItem('myQuotes.' + key, angular.toJson(value));
      }
      else {
        localStorage.setItem('myQuotes.' + key, angular.toJson(value));
      }
    }

    function get(key) {
      if (sessionStorage['myQuotes.' + key]) {
        try {
          return angular.fromJson(sessionStorage.getItem('myQuotes.' + key));
        }
        catch (error) {
          return '';
        }
      }
      else {
        try {
          return angular.fromJson(localStorage.getItem('myQuotes.' + key));
        }
        catch (error) {
          return '';
        }
      }

    }

    function remove(key) {
      if (sessionStorage['myQuotes.' + key]) {
        sessionStorage.removeItem('myQuotes.' + key);
      }
      else {
        if (localStorage['myQuotes.' + key]) {
          localStorage.removeItem('myQuotes.' + key);
        }
      }

    }

    //Use Cookies Instead
    function AlternativeLocalStorage() {
      this.setItem = function (key, value) {
        $cookies.putObject('myQuotes.' + key, value, { expires: moment().add(1, 'months').toDate() });
      };

      this.getItem = function (key) {
        return $cookies.getObject('myQuotes.' + key);
      };

      this.removeItem = function (key) {
        $cookies.remove('myQuotes.' + key);
      };
    }

    function AlternativeSessionStorage() {
      this.setItem = function (key, value) {
        $cookies.putObject('myQuotes.' + key, value);
      };

      this.getItem = function (key) {
        return $cookies.getObject('myQuotes.' + key);
      };

      this.removeItem = function (key) {
        $cookies.remove('myQuotes.' + key);
      };
    }

    function getLocalStorage() {
      try {
        var s = StorageAccessor.getLocalStorage();
        s.setItem('myQuotesLocalStorage', '');
        s.removeItem('myQuotesLocalStorage');

        return s;
      }
      catch (err) {
        return new AlternativeLocalStorage();
      }
    }

    function getSessionStorage() {
      try {
        var s = StorageAccessor.getSessionStorage();
        s.setItem('myQuotesSessionStorage', '');
        s.removeItem('myQuotesSessionStorage');

        return s;
      }
      catch (err) {
        return new AlternativeSessionStorage();
      }
    }


  }

})();