Your task is to write a test for the following function:
```
// Terminates a chain of promises, forcing rejections to be
// thrown as exceptions.
// @param {Any*} promise at the end of a chain of promises
// @returns nothing

q.done(object, fulfilled, rejected, progress)
```

This function is defined as follows:
```
function (object, fulfilled, rejected, progress) {
    return Q(object).done(fulfilled, rejected, progress);
}
```

You may use the following examples to guide your implementation:
```
// usage #1
Q.fcall(promisedStep1).then(promisedStep2).then(promisedStep3).then(promisedStep4).then(function (value4) {    // Do something with value4}).catch(function (error) {    // Handle any error from all above steps}).done();
// usage #2
Q.fcall(promisedStep1).then(promisedStep2).then(promisedStep3).then(promisedStep4).then(function (value4) {    // Do something with value4}).catch(function (error) {    // Handle any error from all above steps}).done();
// usage #3
foo().then(function () {    return "bar";}).done();
// usage #4
foo().then(function () {    return "bar";}).done();
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
    it('test q.done', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.