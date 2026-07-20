Your task is to write a test for the following function:
```
q.when(value, fulfilled, rejected, progressed)
```

You may use the following examples to guide your implementation:
```
// usage #1
function timeout(promise, ms) {    var deferred = Q.defer();    Q.when(promise, deferred.resolve);    delay(ms).then(function () {        deferred.reject(new Error("Timed out"));    });    return deferred.promise;}
// usage #2
return Q.when(valueOrPromise, function (value) {}, function (error) {});
// usage #3
function Promise() {}Promise.prototype.then = function (callback, errback) {    return when(this, callback, errback);};
// usage #4
var ref = function (object) {    if (object && typeof object.promiseSend !== "undefined") {        return object;    }    if (object && typeof object.then !== "undefined") {        return makePromise({            when: function () {                var result = defer();                object.then(result.resolve, result.reject);                return result;            }        }, function fallback(op) {            return Q.when(object, function (object) {                return Q.ref(object).promiseSend.apply(object, arguments);            });        });    }    return makePromise({        when: function () {            return object;
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');
describe('test q', function() {
    it('test q.when', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.