Your task is to write a test for the following function:
```
pull-stream.reduce(reducer, acc, cb )
```

This function is defined as follows:
```
function reduce (reducer, acc, cb ) {
  if(!cb) cb = acc, acc = null
  var sink = drain(function (data) {
    acc = reducer(acc, data)
  }, function (err) {
    cb(err, acc)
  })
  if (arguments.length === 2)
    return function (source) {
      source(null, function (end, data) {
        //if ended immediately, and no initial...
        if(end) return cb(end === true ? null : end)
        acc = data; sink(source)
      })
    }
  else
    return sink
}
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');
describe('test pull_stream', function() {
    it('test pull-stream.reduce', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.