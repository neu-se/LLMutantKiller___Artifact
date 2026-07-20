Your task is to write a test for the following function:
```
pull-stream.asyncMap(map)
```

You may use the following examples to guide your implementation:
```
// usage #1
pull(  pull.values(['file1', 'file2', 'file3']),  pull.asyncMap(fs.stat),  pull.collect(function (err, array) {    console.log(array)  }))
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');
describe('test pull_stream', function() {
    it('test pull-stream.asyncMap', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.