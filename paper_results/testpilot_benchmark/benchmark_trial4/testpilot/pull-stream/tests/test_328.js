describe('test suite', function() {
    it('test case', function(done) {
        let assert = require('assert');

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

// Simple pull-stream implementation for testing
const pull_stream = {
  values: function(arr) {
    let index = 0;
    return function(end, cb) {
      if (end) return cb(end);
      if (index >= arr.length) return cb(true);
      cb(null, arr[index++]);
    };
  },
  
  drain: function(onData, onEnd) {
    return function(read) {
      function next() {
        read(null, function(end, data) {
          if (end) return onEnd(end);
          onData(data);
          next();
        });
      }
      next();
    };
  }
};

function pullStream(source, transform, sink) {
  const transformedSource = transform(source);
  sink(transformedSource);
}

// Test function
function test() {
  const source = pull_stream.values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const result = [];
  
  pullStream(
    source,
    take(function(x) { return x < 5; }),
    pull_stream.drain(function(data) {
      result.push(data);
    }, function(err) {
      assert.strictEqual(err, true); // Stream should end with true
      assert.deepStrictEqual(result, [1, 2, 3, 4]);
      console.log('Test passed!');
    })
  );
}

test();
    })
})