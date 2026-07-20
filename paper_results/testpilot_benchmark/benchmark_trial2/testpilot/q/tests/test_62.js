let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with inspect function', function(done) {
        let inspectCalled = false;
        let inspectArgs = null;
        
        let descriptor = {
            fargs: function(a, b) {
                return [a, b];
            },
            fcall: function(args) {
                return args[0] * args[1];
            }
        };
        
        let inspect = function(promise, args) {
            inspectCalled = true;
            inspectArgs = args;
            // Ensure we return the promise properly
            return promise;
        };
        
        let promiseFunc = q.makePromise(descriptor, null, inspect);
        
        // Create the promise and handle it properly
        let promise = promiseFunc(4, 7);
        
        promise
            .then(function(result) {
                assert.equal(result, 28);
                assert.equal(inspectCalled, true);
                assert.deepEqual(inspectArgs, [4, 7]);
                done();
            })
            .catch(function(error) {
                done(error);
            });
    });
});