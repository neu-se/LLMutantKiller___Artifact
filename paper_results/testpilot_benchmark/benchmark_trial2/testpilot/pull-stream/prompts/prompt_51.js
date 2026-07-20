Your task is to write a test for the following function:
```
pull-stream.flatten()
```

This function is defined as follows:
```
function flatten () {
  return function (read) {
    var _read
    return function (abort, cb) {
      if (abort) { //abort the current stream, and then stream of streams.
        _read ? _read(abort, function(err) {
          read(err || abort, cb)
        }) : read(abort, cb)
      }
      else if(_read) nextChunk()
      else nextStream()

      function nextChunk () {
        _read(null, function (err, data) {
          if (err) {
            if (err === true) nextStream()
            else read(true, function(abortErr) {
              // TODO: what do we do with the abortErr?
              cb(err)
            })
          }
          else cb(null, data)
        })
      }
      function nextStream () {
        _read = null
        read(null, function (end, stream) {
          if(end)
            return cb(end)
          if(stream && 'object' === typeof stream)
            stream = values(stream)
          else if ('function' !== typeof stream)
            stream = once(stream)
          _read = stream
          nextChunk()
        })
      }
    }
  }
}
```

You may use the following examples to guide your implementation:
```
// usage #1
test('flatten arrays', function (t) {  pull(    pull.values([      [1, 2, 3],      [4, 5, 6],      [7, 8, 9]    ]),    pull.flatten(),    pull.collect(function (err, numbers) {      t.deepEqual([1, 2, 3, 4, 5, 6, 7, 8, 9], numbers)      t.end()    })  )})test('flatten stream of streams', function (t) {  pull(    pull.values([      pull.values([1, 2, 3]),
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');
describe('test pull_stream', function() {
    it('test pull-stream.flatten', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.