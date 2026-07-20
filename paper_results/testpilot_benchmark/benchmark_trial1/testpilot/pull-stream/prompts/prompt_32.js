Your task is to write a test for the following function:
```
pull-stream.through(op, onEnd)
```

This function is defined as follows:
```
function through (op, onEnd) {
  var a = false

  function once (abort) {
    if(a || !onEnd) return
    a = true
    onEnd(abort === true ? null : abort)
  }

  return function (read) {
    return function (end, cb) {
      if(end) once(end)
      return read(end, function (end, data) {
        if(!end) op && op(data)
        else once(end)
        cb(end, data)
      })
    }
  }
}
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');
describe('test pull_stream', function() {
    it('test pull-stream.through', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.