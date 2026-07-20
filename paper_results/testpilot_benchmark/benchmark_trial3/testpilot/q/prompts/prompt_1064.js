Your task is to write a test for the following function:
```
// Gets the value of a property in a future turn.
// @param object    promise or immediate reference for target object
// @param name      name of property to get
// @return promise for the property value

q.get(object, key)
```

You may use the following examples to guide your implementation:
```
// usage #1
direct manipulation         using a promise as a proxy--------------------------  -------------------------------value.foo                   promise.get("foo")value.foo = value           promise.put("foo", value)delete value.foo            promise.del("foo")value.foo(...args)          promise.post("foo", [args])value.foo(...args)          promise.invoke("foo", ...args)value(...args)              promise.fapply([args])value(...args)              promise.fcall(...args)
// usage #2
direct manipulation         using a promise as a proxy--------------------------  -------------------------------value.foo                   promise.get("foo")value.foo = value           promise.put("foo", value)delete value.foo            promise.del("foo")value.foo(...args)          promise.post("foo", [args])value.foo(...args)          promise.invoke("foo", ...args)value(...args)              promise.fapply([args])value(...args)              promise.fcall(...args)
// usage #3
return Q.fcall(function () {    return [{ foo: "bar" }, { foo: "baz" }];}).get(0).get("foo");
// usage #4
return Q.fcall(function () {    return [{ foo: "bar" }, { foo: "baz" }];}).get(0).get("foo");
// usage #5
var get = function (object, name) {    var result = defer();    ref(object).promiseSend("get", result.resolve, name);    return result.promise;};get({"a": 10}, "a").then(function (ten) {    // ten === ten});
// usage #6
var get = function (object, name) {    var result = defer();    ref(object).promiseSend("get", result.resolve, name);    return result.promise;};get({"a": 10}, "a").then(function (ten) {    // ten === ten});
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');
describe('test q', function() {
    it('test q.get', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.