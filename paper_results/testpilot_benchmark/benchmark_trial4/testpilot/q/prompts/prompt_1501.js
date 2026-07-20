Your task is to write a test for the following function:
```
q.ninvoke(object, name /*...args*/)
```

This function is defined as follows:
```
function (object, name /*...args*/) {
    var nodeArgs = array_slice(arguments, 2);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
}
```

You may use the following examples to guide your implementation:
```
// usage #1
return Q.ninvoke(redisClient, "get", "user:1:id");return Q.npost(redisClient, "get", ["user:1:id"]);
// usage #2
return Q.ninvoke(redisClient, "get", "user:1:id");return Q.npost(redisClient, "get", ["user:1:id"]);
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');
describe('test q', function() {
    it('test q.ninvoke', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.