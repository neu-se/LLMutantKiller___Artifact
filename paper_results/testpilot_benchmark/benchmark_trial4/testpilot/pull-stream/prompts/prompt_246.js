Your task is to write a test for the following function:
```
pull-stream.flatten()
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