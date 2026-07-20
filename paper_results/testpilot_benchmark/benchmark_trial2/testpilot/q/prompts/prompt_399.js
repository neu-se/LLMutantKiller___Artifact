Your task is to write a test for the following function:
```
// Applies the promised function in a future turn.
// @param object    promise or immediate reference for target function
// @param args      array of application arguments

q.fapply(object, args)
```

This function is defined as follows:
```
function (object, args) {
    return Q(object).dispatch("apply", [void 0, args]);
}
```

You may use the following examples to guide your implementation:
```
// usage #1
direct manipulation         using a promise as a proxy--------------------------  -------------------------------value.foo                   promise.get("foo")value.foo = value           promise.put("foo", value)delete value.foo            promise.del("foo")value.foo(...args)          promise.post("foo", [args])value.foo(...args)          promise.invoke("foo", ...args)value(...args)              promise.fapply([args])value(...args)              promise.fcall(...args)
// usage #2
direct manipulation         using a promise as a proxy--------------------------  -------------------------------value.foo                   promise.get("foo")value.foo = value           promise.put("foo", value)delete value.foo            promise.del("foo")value.foo(...args)          promise.post("foo", [args])value.foo(...args)          promise.invoke("foo", ...args)value(...args)              promise.fapply([args])value(...args)              promise.fcall(...args)
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');
describe('test q', function() {
    it('test q.fapply', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.