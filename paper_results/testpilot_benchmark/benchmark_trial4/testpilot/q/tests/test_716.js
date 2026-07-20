let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.post calls dispatch with correct arguments', function(done) {
        // Create a mock object that has the post method
        let mockPromise = Object.create(q.makePromise.prototype);
        
        // Mock the dispatch method to verify it's called correctly
        let dispatchCalled = false;
        let capturedMethod = null;
        let capturedArgs = null;
        
        mockPromise.dispatch = function(method, args) {
            dispatchCalled = true;
            capturedMethod = method;
            capturedArgs = args;
            return q.resolve('mocked result');
        };
        
        // Test the post method
        let result = mockPromise.post('testMethod', ['arg1', 'arg2']);
        
        // Verify dispatch was called with correct parameters
        assert.strictEqual(dispatchCalled, true, 'dispatch should be called');
        assert.strictEqual(capturedMethod, 'post', 'method should be "post"');
        assert.deepStrictEqual(capturedArgs, ['testMethod', ['arg1', 'arg2']], 'args should match');
        
        // Verify the result is a promise
        assert(q.isPromise(result), 'result should be a promise');
        
        done();
    });
});