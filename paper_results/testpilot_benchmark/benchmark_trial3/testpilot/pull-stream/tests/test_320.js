describe('test suite', function() {
    it('test case', function(done) {
        let assert = require('assert');

// Simple pull-stream implementation for testing
const pull_stream = {
  values: function(array) {
    let index = 0;
    return function(end, cb) {
      if (end) return cb(end);
      if (index >= array.length) return cb(true);
      cb(null, array[index++]);
    };
  },
  
  drain: function(each, done) {
    return function(read) {
      (function next() {
        read(null, function(end, data) {
          if (end) return done && done(end === true ? null : end);
          if (each) each(data);
          next();
        });
      })();
    };
  }
};

// Main pull function
function pull(...streams) {
  let read = streams[0];
  for (let i = 1; i < streams.length; i++) {
    read = streams[i](read);
  }
  return read;
}

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
        last = false; cb(err || true)
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

// Test function
function test_pull_stream() {
    console.log('Testing pull_stream with empty stream...');
    
    const source = pull_stream.values([]);
    const result = [];
    
    pull(
        source,
        take(3),
        pull_stream.drain(function(data) {
            result.push(data);
        }, function(err) {
            assert.strictEqual(err, true); // Stream should end normally
            assert.deepStrictEqual(result, []);
            console.log('Test passed: empty stream handled correctly');
        })
    );
}

// Run the test
test_pull_stream();
    })
})