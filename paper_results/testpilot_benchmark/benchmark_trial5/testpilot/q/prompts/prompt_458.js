Your task is to write a test for the following function:
```
// Causes a promise to be rejected if it does not get fulfilled before
// some milliseconds time out.
// @param {Any*} promise
// @param {Number} milliseconds timeout
// @param {Any*} custom error message or Error object (optional)
// @returns a promise for the resolution of the given promise if it is
// fulfilled before the timeout, otherwise rejected.

q.timeout(object, ms, error)
```

You may use the following examples to guide your implementation:
```
// usage #1
function timeout(promise, ms) {    var deferred = Q.defer();    Q.when(promise, deferred.resolve);    delay(ms).then(function () {        deferred.reject(new Error("Timed out"));    });    return deferred.promise;}
// usage #2
function timeout(promise, ms) {    var deferred = Q.defer();    Q.when(promise, deferred.resolve);    delay(ms).then(function () {        deferred.reject(new Error("Timed out"));    });    return deferred.promise;}
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');
describe('test q', function() {
    it('test q.timeout', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.