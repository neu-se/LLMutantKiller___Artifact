Your task is to write a test for the following function:
```
q.makePromise(descriptor, fallback, inspect)
```

You may use the following examples to guide your implementation:
```
// usage #1
var ref = function (object) {    if (object && typeof object.promiseSend !== "undefined") {        return object;    }    if (object && typeof object.then !== "undefined") {        return makePromise({            when: function () {                var result = defer();                object.then(result.resolve, result.reject);                return result;            }        }, function fallback(op) {            return Q.when(object, function (object) {                return Q.ref(object).promiseSend.apply(object, arguments);            });        });    }    return makePromise({        when: function () {            return object;
// usage #2
var reject = function (reason) {    var forward = function (reason) {        return reject(reason);    };    return makePromise({        when: function (errback) {            errback = errback || forward;            return errback(reason);        }    }, forward);};
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');
describe('test q', function() {
    it('test q.makePromise', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.