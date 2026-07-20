let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise exception handling in promiseDispatch', function(done) {
        const descriptor = {
            throwError: function() {
                throw new Error("test exception");
            }
        };
        
        const promise = q.makePromise(descriptor);
        
        // Test that exceptions are caught and converted to rejected promises
        promise.promiseDispatch(function(result) {
            // The result should be a rejected promise
            assert(result && typeof result.then === 'function');
            done();
        }, 'throwError', []);
    });

    })