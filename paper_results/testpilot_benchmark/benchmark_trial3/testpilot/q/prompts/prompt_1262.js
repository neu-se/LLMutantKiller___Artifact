Your task is to write a test for the following function:
```
q.allSettled(promises)
```

You may use the following examples to guide your implementation:
```
// usage #1
Q.allSettled(promises).then(function (results) {    results.forEach(function (result) {        if (result.state === "fulfilled") {            var value = result.value;        } else {            var reason = result.reason;        }    });});
// usage #2
Q.allSettled(promises).then(function (results) {    results.forEach(function (result) {        if (result.state === "fulfilled") {            var value = result.value;        } else {            var reason = result.reason;        }    });});
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');
describe('test q', function() {
    it('test q.allSettled', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.