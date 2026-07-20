Your task is to write a test for the following function:
```
pull-stream.map(mapper)
```

You may use the following examples to guide your implementation:
```
// usage #1
pull(  values([0, 1, 2, 3]),  map(function (x) {    return x * x  }),  log())// 0// 1// 4// 9
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');
describe('test pull_stream', function() {
    it('test pull-stream.map', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.