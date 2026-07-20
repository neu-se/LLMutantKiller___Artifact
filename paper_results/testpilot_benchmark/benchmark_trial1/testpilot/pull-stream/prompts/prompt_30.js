Your task is to write a test for the following function:
```
pull-stream.filterNot(test)
```

This function is defined as follows:
```
function filterNot (test) {
  test = tester(test)
  return filter(function (data) { return !test(data) })
}
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');
describe('test pull_stream', function() {
    it('test pull-stream.filterNot', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.