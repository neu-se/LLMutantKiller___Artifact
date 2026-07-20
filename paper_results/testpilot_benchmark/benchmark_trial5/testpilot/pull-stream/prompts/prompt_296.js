Your task is to write a test for the following function:
```
pull-stream.find(test, cb)
```

This function is defined as follows:
```
function find (test, cb) {
  var ended = false
  if(!cb)
    cb = test, test = id
  else
    test = prop(test) || id

  return drain(function (data) {
    if(test(data)) {
      ended = true
      cb(null, data)
    return false
    }
  }, function (err) {
    if(ended) return //already called back
    cb(err === true ? null : err, null)
  })
}
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');
describe('test pull_stream', function() {
    it('test pull-stream.find', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.