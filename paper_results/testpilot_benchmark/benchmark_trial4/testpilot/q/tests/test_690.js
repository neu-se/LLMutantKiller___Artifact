let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.delete', function(done) {
        // Create a mock object that implements the dispatch method
        let mockPromise = Object.create(q.makePromise.prototype);
        let dispatchCalled = false;
        let capturedMethod = null;
        let capturedArgs = null;
        
        // Mock the dispatch method to capture calls
        mockPromise.dispatch = function(method, args) {
            dispatchCalled = true;
            capturedMethod = method;
            capturedArgs = args;
            return q.resolve('delete_result');
        };
        
        // Test the delete method
        let result = mockPromise.delete('test_key');
        
        // Verify that dispatch was called with correct parameters
        assert.strictEqual(dispatchCalled, true, 'dispatch should be called');
        assert.strictEqual(capturedMethod, 'delete', 'method should be "delete"');
        assert.deepStrictEqual(capturedArgs, ['test_key'], 'args should contain the key');
        
        // Verify the result is a promise
        assert(q.isPromise(result), 'result should be a promise');
        
        // Verify the promise resolves correctly
        result.then(function(value) {
            assert.strictEqual(value, 'delete_result', 'promise should resolve with expected value');
            done();
        }).catch(done);
    });
    
    })