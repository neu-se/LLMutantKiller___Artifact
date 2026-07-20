Your task is to write a test for the following function:
```
pull-stream.once(value, onAbort)
```

This function is defined as follows:
```
function once (value, onAbort) {
  return function (abort, cb) {
    if(abort)
      return abortCb(cb, abort, onAbort)
    if(value != null) {
      var _value = value; value = null
      cb(null, _value)
    } else
      cb(true)
  }
}
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');
describe('test pull_stream', function() {
    it('test pull-stream.once', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.