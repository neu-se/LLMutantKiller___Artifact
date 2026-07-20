Your task is to write a test for the following function:
```
q.Promise.all(promises)
```

This function is defined as follows:
```
function all(promises) {
    return when(promises, function (promises) {
        var pendingCount = 0;
        var deferred = defer();
        array_reduce(promises, function (undefined, promise, index) {
            var snapshot;
            if (
                isPromise(promise) &&
                (snapshot = promise.inspect()).state === "fulfilled"
            ) {
                promises[index] = snapshot.value;
            } else {
                ++pendingCount;
                when(
                    promise,
                    function (value) {
                        promises[index] = value;
                        if (--pendingCount === 0) {
                            deferred.resolve(promises);
                        }
                    },
                    deferred.reject,
                    function (progress) {
                        deferred.notify({ index: index, value: progress });
                    }
                );
            }
        }, void 0);
        if (pendingCount === 0) {
            deferred.resolve(promises);
        }
        return deferred.promise;
    });
}
```

You may use the following examples to guide your implementation:
```
// usage #1
return Q.all([    eventualAdd(2, 2),    eventualAdd(10, 20)]);
// usage #2
return Q.all([    eventualAdd(2, 2),    eventualAdd(10, 20)]);
// usage #3
return Q.fcall(function () {    return [a, b];}).all();
// usage #4
return Q.fcall(function () {    return [a, b];}).all();
// usage #5
"use strict";var Q = require("../q");function eventually(value) {    return Q.delay(value, 1000);}Q.all([1, 2, 3].map(eventually)).done(function (result) {    console.log(result);});Q.all([    eventually(10),    eventually(20)]).spread(function (x, y) {    console.log(x, y);})
// usage #6
"use strict";var Q = require("../q");function eventually(value) {    return Q.delay(value, 1000);}Q.all([1, 2, 3].map(eventually)).done(function (result) {    console.log(result);});Q.all([    eventually(10),    eventually(20)]).spread(function (x, y) {    console.log(x, y);})
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');
describe('test q', function() {
    it('test q.Promise.all', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.