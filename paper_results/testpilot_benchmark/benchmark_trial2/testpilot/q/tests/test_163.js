let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.invoke', function(done) {
        // Create a mock object that implements the dispatch method
        let mockPromise = Object.create(q.makePromise.prototype);
        let capturedMethod = null;
        let capturedArgs = null;
        
        // Mock the dispatch method to capture calls
        mockPromise.dispatch = function(method, args) {
            capturedMethod = method;
            capturedArgs = args;
            return q.resolve('test result');
        };
        
        // Test invoke with method name only
        let result = mockPromise.invoke('testMethod');
        
        // Verify dispatch was called with correct parameters
        assert.equal(capturedMethod, 'post');
        assert.equal(capturedArgs[0], 'testMethod');
        assert.deepEqual(capturedArgs[1], []);
        
        // Verify it returns a promise
        assert(q.isPromise(result));
        
        result.then(function(value) {
            assert.equal(value, 'test result');
            done();
        }).catch(done);
    });
    
    })