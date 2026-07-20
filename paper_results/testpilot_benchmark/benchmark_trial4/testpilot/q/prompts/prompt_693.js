Your task is to write a test for the following function:
```
q.makePromise.prototype.delay(timeout)
```

You may use the following examples to guide your implementation:
```
// usage #1
function delay(ms) {    var deferred = Q.defer();    setTimeout(deferred.resolve, ms);    return deferred.promise;}
// usage #2
function delay(ms) {    var deferred = Q.defer();    setTimeout(deferred.resolve, ms);    return deferred.promise;}
// usage #3
function timeout(promise, ms) {    var deferred = Q.defer();    Q.when(promise, deferred.resolve);    delay(ms).then(function () {        deferred.reject(new Error("Timed out"));    });    return deferred.promise;}
// usage #4
function timeout(promise, ms) {    var deferred = Q.defer();    Q.when(promise, deferred.resolve);    delay(ms).then(function () {        deferred.reject(new Error("Timed out"));    });    return deferred.promise;}
// usage #5
function theDepthsOfMyProgram() {  Q.delay(100).done(function explode() {    throw new Error("boo!");  });}theDepthsOfMyProgram();
// usage #6
function theDepthsOfMyProgram() {  Q.delay(100).done(function explode() {    throw new Error("boo!");  });}theDepthsOfMyProgram();
// usage #7
"use strict";var Q = require("../q");function eventually(value) {    return Q.delay(value, 1000);}Q.all([1, 2, 3].map(eventually)).done(function (result) {    console.log(result);});Q.all([    eventually(10),    eventually(20)]).spread(function (x, y) {    console.log(x, y);})
// usage #8
"use strict";var Q = require("../q");function eventually(value) {    return Q.delay(value, 1000);}Q.all([1, 2, 3].map(eventually)).done(function (result) {    console.log(result);});Q.all([    eventually(10),    eventually(20)]).spread(function (x, y) {    console.log(x, y);})
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');
describe('test q', function() {
    it('test q.makePromise.prototype.delay', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.