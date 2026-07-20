Your task is to write a test for the following function:
```
pull-stream.take(test, opts)
```

This function is defined as follows:
```
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
```

You may use the following examples to guide your implementation:
```
// usage #1
var pull = require('pull-stream')// var take = require('pull-stream/throughs/take') // if you just need takepull(  pull.values(['a', 'b', 'c', 'd', 'e']),  pull.take(3),  pull.collect((err, data) => {    console.log(data)    // => ['a', 'b', 'c']  }))
// usage #2
pull(  pull.values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),  pull.take(n => n < 4.6), { last: true }),  // include the last value tested (5)  pull.collect(function (err, results) {    console.log(results)    // => [1, 2, 3, 4, 5]  })})
// usage #3
pull(  pull.values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),  pull.take(n => n < 4.6), { last: false }),  // exclude the last value tested (5)  pull.collect(function (err, results) {    console.log(results)    // => [1, 2, 3, 4]  })})
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');
describe('test pull_stream', function() {
    it('test pull-stream.take', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.