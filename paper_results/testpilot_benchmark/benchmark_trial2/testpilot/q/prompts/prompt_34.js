Your task is to write a test for the following function:
```
q.Promise.reject(reason)
```

This function is defined as follows:
```
function reject(reason) {
    var rejection = Promise({
        "when": function (rejected) {
            // note that the error has been handled
            if (rejected) {
                untrackRejection(this);
            }
            return rejected ? rejected(reason) : this;
        }
    }, function fallback() {
        return this;
    }, function inspect() {
        return { state: "rejected", reason: reason };
    });

    // Note that the reason has not been handled.
    trackRejection(rejection, reason);

    return rejection;
}
```

You may use the following examples to guide your implementation:
```
// usage #1
var deferred = Q.defer();FS.readFile("foo.txt", "utf-8", function (error, text) {    if (error) {        deferred.reject(new Error(error));    } else {        deferred.resolve(text);    }});return deferred.promise;
// usage #2
// this:deferred.reject(new Error("Can't do it"));// is shorthand for:var rejection = Q.fcall(function () {    throw new Error("Can't do it");});deferred.resolve(rejection);
// usage #3
function timeout(promise, ms) {    var deferred = Q.defer();    Q.when(promise, deferred.resolve);    delay(ms).then(function () {        deferred.reject(new Error("Timed out"));    });    return deferred.promise;}
// usage #4
function requestOkText(url) {    var request = new XMLHttpRequest();    var deferred = Q.defer();    request.open("GET", url, true);    request.onload = onload;    request.onerror = onerror;    request.onprogress = onprogress;    request.send();    function onload() {        if (request.status === 200) {            deferred.resolve(request.responseText);        } else {            deferred.reject(new Error("Status code was " + request.status));        }    }    function onerror() {        deferred.reject(new Error("Can't XHR " + JSON.stringify(url)));
// usage #5
function requestOkText(url) {    return Q.Promise(function(resolve, reject, notify) {        var request = new XMLHttpRequest();        request.open("GET", url, true);        request.onload = onload;        request.onerror = onerror;        request.onprogress = onprogress;        request.send();        function onload() {            if (request.status === 200) {                resolve(request.responseText);            } else {                reject(new Error("Status code was " + request.status));            }        }        function onerror() {            reject(new Error("Can't XHR " + JSON.stringify(url)));
// usage #6
reject("Meh.").then(function (value) {    // we never get here}, function (reason) {    // reason === "Meh."});
// usage #7
var maybeOneOneSecondLater = function (callback, errback) {    var result = defer();    setTimeout(function () {        if (Math.random() < .5) {            result.resolve(1);        } else {            result.resolve(reject("Can't provide one."));        }    }, 1000);    return result.promise;};
// usage #8
var when = function (value, _callback, _errback) {    var result = defer();    var done;    _callback = _callback || function (value) {        return value;    };    _errback = _errback || function (reason) {        return reject(reason);    };    var callback = function (value) {        try {            return _callback(value);        } catch (reason) {            return reject(reason);        }    };    var errback = function (reason) {        try {
// usage #9
var makePromise = function (handler, fallback) {    var promise = new Promise();    handler = handler || {};    fallback = fallback || function (op) {        return reject("Can't " + op);    };    promise.promiseSend = function (op, callback) {        var args = Array.prototype.slice.call(arguments, 2);        var result;        callback = callback || function (value) {return value};        if (handler[op]) {            result = handler[op].apply(handler, args);        } else {            result = fallback.apply(handler, [op].concat(args));        }        return callback(result);    };    return promise;};
// usage #10
var reject = function (reason) {    var forward = function (reason) {        return reject(reason);    };    return makePromise({        when: function (errback) {            errback = errback || forward;            return errback(reason);        }    }, forward);};
```

Please proceed by modifying the following code fragment:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');
describe('test q', function() {
    it('test q.Promise.reject', function(done) {
``` 
so that it becomes a test suite containing a few self-contained unit tests.  The tests should not rely on any 
external resources. For example, a test should not attempt to access files that it does not create itself.

Provide your answer as a fenced code block.