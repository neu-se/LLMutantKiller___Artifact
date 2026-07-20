Your task is to write a test for the following function:
```
q.makePromise.prototype.denodeify(/*...args*/)
```

This function is defined as follows:
```
function (/*...args*/) {
    var args = array_slice(arguments);
    args.unshift(this);
    return Q.denodeify.apply(void 0, args);
}
```

You may use the following examples to guide your implementation:
```
// usage #1
var readFile = Q.denodeify(FS.readFile);return readFile("foo.txt", "utf-8");var redisClientGet = Q.nbind(redisClient.get, redisClient);return redisClientGet("user:1:id");
// usage #2
var readFile = Q.denodeify(FS.readFile);return readFile("foo.txt", "utf-8");var redisClientGet = Q.nbind(redisClient.get, redisClient);return redisClientGet("user:1:id");
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');
describe('test q', function() {
    it('test q.makePromise.prototype.denodeify', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.