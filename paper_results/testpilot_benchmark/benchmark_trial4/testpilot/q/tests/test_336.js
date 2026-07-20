let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with custom fallback', function(done) {
        const descriptor = {
            get: function() {
                return 'test value';
            }
        };
        
        const fallback = function(op) {
            return 'fallback called for ' + op;
        };
        
        const promise = q.makePromise(descriptor, fallback);
        
        // Test promiseDispatch with existing operation
        promise.promiseDispatch(function(result) {
            assert.equal(result, 'test value');
        }, 'get', []);
        
        // Test promiseDispatch with non-existing operation (should use fallback)
        promise.promiseDispatch(function(result) {
            assert.equal(result, 'fallback called for unknown');
            done();
        }, 'unknown', []);
    });

    })