Your task is to write a test for the following function:
```
q.spread(value, fulfilled, rejected)
```

You may use the following examples to guide your implementation:
```
// usage #1
function eventualAdd(a, b) {    return Q.spread([a, b], function (a, b) {        return a + b;    })}
// usage #2
function eventualAdd(a, b) {    return Q.spread([a, b], function (a, b) {        return a + b;    })}
// usage #3
return getUsername().then(function (username) {    return [username, getUser(username)];}).spread(function (username, user) {});
// usage #4
return getUsername().then(function (username) {    return [username, getUser(username)];}).spread(function (username, user) {});
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
    it('test q.spread', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.