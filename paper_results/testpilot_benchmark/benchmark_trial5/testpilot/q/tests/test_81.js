let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.toString', function(done) {
        // Test 1: Basic toString functionality
        let deferred = q.defer();
        let promise = deferred.promise;
        
        let toStringResult = promise.toString();
        assert(typeof toStringResult === 'string', 'toString should return a string');
        assert(toStringResult.includes('[object Promise]') || toStringResult.includes('Promise'), 
               'toString should indicate it is a Promise object');
        
        // Test 2: toString on resolved promise
        let resolvedPromise = q.resolve('test value');
        let resolvedToString = resolvedPromise.toString();
        assert(typeof resolvedToString === 'string', 'toString on resolved promise should return a string');
        
        // Test 3: toString on rejected promise
        let rejectedPromise = q.reject(new Error('test error'));
        let rejectedToString = rejectedPromise.toString();
        assert(typeof rejectedToString === 'string', 'toString on rejected promise should return a string');
        
        // Test 4: toString should be consistent across multiple calls
        let anotherPromise = q.defer().promise;
        let firstCall = anotherPromise.toString();
        let secondCall = anotherPromise.toString();
        assert.strictEqual(firstCall, secondCall, 'toString should return consistent results');
        
        // Test 5: toString should work on promise created with q()
        let qPromise = q('immediate value');
        let qToString = qPromise.toString();
        assert(typeof qToString === 'string', 'toString on q() promise should return a string');
        
        done();
    });
});