let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.get calls dispatch with correct arguments', function(done) {
        // Create a promise object
        let promise = q.defer().promise;
        
        // Mock the dispatch method to verify it's called correctly
        let dispatchCalled = false;
        let capturedMethod = null;
        let capturedArgs = null;
        
        promise.dispatch = function(method, args) {
            dispatchCalled = true;
            capturedMethod = method;
            capturedArgs = args;
            return q.resolve('mocked result');
        };
        
        // Call the get method
        let result = promise.get('testKey');
        
        // Verify dispatch was called with correct arguments
        assert.strictEqual(dispatchCalled, true, 'dispatch should be called');
        assert.strictEqual(capturedMethod, 'get', 'dispatch should be called with "get" method');
        assert.deepStrictEqual(capturedArgs, ['testKey'], 'dispatch should be called with key in array');
        
        // Verify the result is a promise
        assert.strictEqual(typeof result.then, 'function', 'get should return a promise');
        
        done();
    });
});