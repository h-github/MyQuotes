(function () {
  'use strict';

  angular.module('myQuotes')
    .service('QuotesService', QuotesService);

  function QuotesService() {

    var quotes = [];
    var isTest = true;
    var mockPostedQuotes = [{
      'id': 1,
      'userId': '10155457810183556',
      'content': 'Life is about making an impact, not making an income.',
      'author': 'Kevin Kruse',
      'dateCreated': '2016-11-18T02:42:48Z',
      'postedDate': '2017-02-22T07:14:51Z'
    },
    {
      'id': 2,
      'userId': '10155457810183556',
      'content': 'Whatever the mind of man can conceive and believe, it can achieve.',
      'author': 'Napoleon Hill',
      'dateCreated': '2017-02-02T07:18:42Z',
      'postedDate': '2017-02-16T23:14:56Z'
    },
    {
      'id': 3,
      'userId': '10155457810183556',
      'content': 'Strive not to be a success, but rather to be of value.',
      'author': 'Albert Einstein',
      'dateCreated': '2016-10-22T07:33:35Z',
      'postedDate': '2017-03-20T04:46:20Z'
    },
    {
      'id': 4,
      'userId': '10155457810183556',
      'content': 'Two roads diverged in a wood, and I-I took the one less traveled by, And that has made all the difference.',
      'author': 'Robert Frost',
      'dateCreated': '2017-06-04T12:13:25Z',
      'postedDate': '2017-03-20T21:15:45Z'
    },
    {
      'id': 5,
      'userId': '10155457810183556',
      'content': 'I attribute my success to this: I never gave or took any excuse.',
      'author': 'Florence Nightingale',
      'dateCreated': '2016-09-04T11:21:04Z',
      'postedDate': '2016-11-08T07:45:34Z'
    },
    {
      'id': 6,
      'userId': '10155457810183556',
      'content': 'The most difficult thing is the decision to act, the rest is merely tenacity.',
      'author': 'Amelia Earhart',
      'dateCreated': '2016-07-26T07:29:00Z',
      'postedDate': '2017-01-31T18:12:25Z'
    },
    {
      'id': 7,
      'userId': '10155457810183556',
      'content': 'Every strike brings me closer to the next home run.',
      'author': 'Babe Ruth',
      'dateCreated': '2017-03-17T13:53:50Z',
      'postedDate': '2016-06-19T21:56:25Z'
    }];

    var mockNewQuotes = [
      {
        'id': 8,
        'userId': '10155457810183556',
        'content': 'Definiteness of purpose is the starting point of all achievement.',
        'author': 'W. Clement Stone',
        'dateCreated': '2017-04-21T19:23:30Z',
        'postedDate': ''
      },
      {
        'id': 9,
        'userId': '10155457810183556',
        'content': 'Life is what happens to you while you\'re busy making other plans.',
        'author': 'John Lennon',
        'dateCreated': '2017-02-20T22:41:48Z',
        'postedDate': ''
      },
      {
        'id': 10,
        'userId': '10155457810183556',
        'content': 'Life isn\'t about getting and having, it\'s about giving and being.',
        'author': 'Kevin Kruse',
        'dateCreated': '2017-04-18T09:13:06Z',
        'postedDate': ''
      },
      {
        'id': 11,
        'userId': '10155457810183556',
        'content': 'We become what we think about.',
        'author': 'Earl Nightingale',
        'dateCreated': '2017-04-20T17:17:50Z',
        'postedDate': ''
      },
      {
        'id': 12,
        'userId': '10155457810183556',
        'content': 'The mind is everything. What you think you become.',
        'author': 'Buddha',
        'dateCreated': '2016-06-23T23:05:08Z',
        'postedDate': ''
      },
      {
        'id': 13,
        'userId': '10155457810183556',
        'content': 'An unexamined life is not worth living.',
        'author': 'Socrates',
        'dateCreated': '2017-04-16T14:29:19Z',
        'postedDate': ''
      },
      {
        'id': 14,
        'userId': '10155457810183556',
        'content': 'Eighty percent of success is showing up.',
        'author': 'Woody Allen',
        'dateCreated': '2017-02-22T16:50:22Z',
        'postedDate': ''
      },
      {
        'id': 15,
        'userId': '10155457810183556',
        'content': 'Your time is limited, so don\'t waste it living someone else\'s life.',
        'author': 'Steve Jobs',
        'dateCreated': '2016-06-21T10:20:00Z',
        'postedDate': ''
      },
      {
        'id': 16,
        'userId': '10155457810183556',
        'content': 'Winning isn\'t everything, but wanting to win is.',
        'author': 'Vince Lombardi',
        'dateCreated': '2016-09-07T19:04:03Z',
        'postedDate': ''
      },
      {
        'id': 17,
        'userId': '10155457810183556',
        'content': 'I am not a product of my circumstances. I am a product of my decisions.',
        'author': 'Stephen Covey',
        'dateCreated': '2017-02-16T14:25:51Z',
        'postedDate': ''
      }
    ];

    function Quote(id, userId, content, author, dateCreated, postedDate) {
      this.id = id;
      this.userId = userId;
      this.content = content;
      this.author = author;
      this.dateCreated = dateCreated;
      this.postedDate = postedDate;
    }



    var service = {
      getNewQuetes : getNewQuetes,
      getPostedQuetes: getPostedQuetes
    };

    return service;




    function getNewQuetes(userId) {
      if (isTest) {
        return _.takeWhile(mockNewQuotes, function (q) { return q.userId === userId; });
      }
    }

    function getPostedQuetes(userId) {
      if (isTest) {
        return _.takeWhile(mockPostedQuotes, function (q) { return q.userId === userId; });
      }
    }


    
  }
}());