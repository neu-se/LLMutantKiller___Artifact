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
        mockPromise.invoke('testMethod').then(function(result) {
            assert.equal(capturedMethod, 'post');
            assert.equal(capturedArgs[0], 'testMethod');
            assert.deepEqual(capturedArgs[1], []);
            assert.equal(result, 'test result');
            done();
        }).catch(done);
    });
    
    })