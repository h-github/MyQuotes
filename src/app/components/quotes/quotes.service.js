(function () {
  'use strict';

  angular.module('myQuotes')
    .service('QuotesService', QuotesService);

  function QuotesService(FacebookService, LocalStorage) {

    var quotes = [];
    var isTest = true;
    var mockQuotes = [{
      'id': 1,
      'userId': '10155457810183556',
      'content': 'Life is about making an impact, not making an income.',
      'author': 'Kevin Kruse',
      'dateCreated': '2016-11-18T02:42:48Z',
      'datePosted': '2017-02-22T07:14:51Z'
    },
    {
      'id': 2,
      'userId': '10155457810183556',
      'content': 'Whatever the mind of man can conceive and believe, it can achieve.',
      'author': 'Napoleon Hill',
      'dateCreated': '2017-02-02T07:18:42Z',
      'datePosted': '2017-02-16T23:14:56Z'
    },
    {
      'id': 3,
      'userId': '10155457810183556',
      'content': 'Strive not to be a success, but rather to be of value.',
      'author': 'Albert Einstein',
      'dateCreated': '2016-10-22T07:33:35Z',
      'datePosted': '2017-03-20T04:46:20Z'
    },
    {
      'id': 4,
      'userId': '10155457810183556',
      'content': 'Two roads diverged in a wood, and I-I took the one less traveled by, And that has made all the difference.',
      'author': 'Robert Frost',
      'dateCreated': '2017-06-04T12:13:25Z',
      'datePosted': '2017-03-20T21:15:45Z'
    },
    {
      'id': 5,
      'userId': '10155457810183556',
      'content': 'I attribute my success to this: I never gave or took any excuse.',
      'author': 'Florence Nightingale',
      'dateCreated': '2016-09-04T11:21:04Z',
      'datePosted': '2016-11-08T07:45:34Z'
    },
    {
      'id': 6,
      'userId': '10155457810183556',
      'content': 'The most difficult thing is the decision to act, the rest is merely tenacity.',
      'author': 'Amelia Earhart',
      'dateCreated': '2016-07-26T07:29:00Z',
      'datePosted': '2017-01-31T18:12:25Z'
    },
    {
      'id': 7,
      'userId': '10155457810183556',
      'content': 'Every strike brings me closer to the next home run.',
      'author': 'Babe Ruth',
      'dateCreated': '2017-03-17T13:53:50Z',
      'datePosted': '2016-06-19T21:56:25Z'
    },
    {
      'id': 8,
      'userId': '10155457810183556',
      'content': 'Definiteness of purpose is the starting point of all achievement.',
      'author': 'W. Clement Stone',
      'dateCreated': '2017-04-21T19:23:30Z',
      'datePosted': ''
    },
    {
      'id': 9,
      'userId': '10155457810183556',
      'content': 'Life is what happens to you while you\'re busy making other plans.',
      'author': 'John Lennon',
      'dateCreated': '2017-02-20T22:41:48Z',
      'datePosted': ''
    },
    {
      'id': 10,
      'userId': '10155457810183556',
      'content': 'Life isn\'t about getting and having, it\'s about giving and being.',
      'author': 'Kevin Kruse',
      'dateCreated': '2017-04-18T09:13:06Z',
      'datePosted': ''
    },
    {
      'id': 11,
      'userId': '10155457810183556',
      'content': 'We become what we think about.',
      'author': 'Earl Nightingale',
      'dateCreated': '2017-04-20T17:17:50Z',
      'datePosted': ''
    },
    {
      'id': 12,
      'userId': '10155457810183556',
      'content': 'The mind is everything. What you think you become.',
      'author': 'Buddha',
      'dateCreated': '2016-06-23T23:05:08Z',
      'datePosted': ''
    },
    {
      'id': 13,
      'userId': '10155457810183556',
      'content': 'An unexamined life is not worth living.',
      'author': 'Socrates',
      'dateCreated': '2017-04-16T14:29:19Z',
      'datePosted': ''
    },
    {
      'id': 14,
      'userId': '10155457810183556',
      'content': 'Eighty percent of success is showing up.',
      'author': 'Woody Allen',
      'dateCreated': '2017-02-22T16:50:22Z',
      'datePosted': ''
    },
    {
      'id': 15,
      'userId': '10155457810183556',
      'content': 'Your time is limited, so don\'t waste it living someone else\'s life.',
      'author': 'Steve Jobs',
      'dateCreated': '2016-06-21T10:20:00Z',
      'datePosted': ''
    },
    {
      'id': 16,
      'userId': '10155457810183556',
      'content': 'Winning isn\'t everything, but wanting to win is.',
      'author': 'Vince Lombardi',
      'dateCreated': '2016-09-07T19:04:03Z',
      'datePosted': ''
    },
    {
      'id': 17,
      'userId': '10155457810183556',
      'content': 'I am not a product of my circumstances. I am a product of my decisions.',
      'author': 'Stephen Covey',
      'dateCreated': '2017-02-16T14:25:51Z',
      'datePosted': ''
    }
    ];

    function Quote(id, userId, content, author, dateCreated, datePosted) {
      this.id = id;
      this.userId = userId;
      this.content = content;
      this.author = author;
      this.dateCreated = dateCreated;
      this.datePosted = datePosted;
    }



    var service = {
      getNewQuetes: getNewQuetes,
      getPostedQuetes: getPostedQuetes,
      deleteQuote: deleteQuote,
      addNewQuote: addNewQuote,
      postQuote: postQuote
    };

    return service;




    function getNewQuetes(userId) {
      if (isTest) {
        return _.filter(mockQuotes, function (q) {
          return q.userId === userId && q.datePosted === '';
        });
      }
    }

    function getPostedQuetes(userId) {
      if (isTest) {
        return _.filter(mockQuotes, function (q) {
          return q.userId === userId && q.datePosted !== '';
        });
      }
    }

    function deleteQuote(quote) {
      _.remove(mockQuotes, function (q) {
        return quote.userId === q.userId && quote.id === q.id;
      });
    }

    function addNewQuote(newQuote) {
      var sortedQuotes = _.sortBy(mockQuotes, ['id']);
      var last = _.last(sortedQuotes);
      newQuote.id = ++last.id;
      newQuote.userId = LocalStorage.get('userID') || '';
      newQuote.dateCreated = moment().utc().format();
      newQuote.datePosted = '';
      mockQuotes.push(newQuote);
    }

    function postQuote(quote) {
      FacebookService.postQuote(quote);
      mockQuotes = _.map(mockQuotes, function (q) {
        if (q.id === quote.id) {
          q.datePosted = moment().utc().format();
          return q;
        } else {
          return q;
        }
      });
    }
  }
}());