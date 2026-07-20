let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

function take (test, opts) {
  opts = opts || {}
  var last = opts.last || false // whether the first item for which !test(item) should still pass
  var ended = false
  if('number' === typeof test) {
    last = true
    var n = test; test = function () {
      return --n
    }
  }

  return function (read) {

    function terminate (cb) {
      read(true, function (err) {
        last = false; cb(true) // Always pass true to indicate intentional termination
      })
    }

    return function (end, cb) {
      if(ended && !end) last ? terminate(cb) : cb(ended)
      else if(ended = end) read(ended, cb)
      else
        read(null, function (end, data) {
          if(ended = ended || end) {
            //last ? terminate(cb) :
            cb(ended)
          }
          else if(!test(data)) {
            ended = true
            last ? cb(null, data) : terminate(cb)
          }
          else
            cb(null, data)
        })
    }
  }
}

describe('test pull_stream', function() {
    it('should take first n items when given a number', function(done) {
        const source = pull_stream.values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        const result = [];
        
        pull_stream(
            source,
            take(3),
            pull_stream.drain(function(data) {
                result.push(data);
            }, function(err) {
                assert.strictEqual(err, true); // Stream should end normally
                assert.deepStrictEqual(result, [1, 2, 3]);
                done();
            })
        );
    });

    })