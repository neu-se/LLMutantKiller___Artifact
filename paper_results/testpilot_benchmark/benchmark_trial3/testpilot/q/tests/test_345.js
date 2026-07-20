let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with fallback function', function(done) {
        const descriptor = {
            get: function() {
                return 'existing operation';
            }
        };
        
        const fallback = function(op, args) {
            return 'fallback called for ' + op;
        };
        
        const promise = q.makePromise(descriptor, fallback);
        
        // Test existing operation uses descriptor
        promise.promiseDispatch(function(result) {
            assert.equal(result, 'existing operation');
        }, 'get', []);
        
        // Test non-existing operation uses fallback
        promise.promiseDispatch(function(result) {
            assert.equal(result, 'fallback called for unknown');
            done();
        }, 'unknown', []);
    });
});