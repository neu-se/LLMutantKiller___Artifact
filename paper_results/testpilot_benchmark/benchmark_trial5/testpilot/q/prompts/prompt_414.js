Your task is to write a test for the following function:
```
// Binds the promised function, transforming return values into a fulfilled
// promise and thrown errors into a rejected one.
// @param object    promise or immediate reference for target function
// @param ...args   array of application arguments

q.fbind(object /*...args*/)
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');
describe('test q', function() {
    it('test q.fbind', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.