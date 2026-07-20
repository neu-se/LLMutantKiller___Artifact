let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.invoke with arguments', function(done) {
        let mockPromise = Object.create(q.makePromise.prototype);
        let capturedMethod = null;
        let capturedArgs = null;
        
        mockPromise.dispatch = function(method, args) {
            capturedMethod = method;
            capturedArgs = args;
            return q.resolve('result with args');
        };
        
        // Test invoke with method name and arguments
        let result = mockPromise.invoke('methodWithArgs', 'arg1', 42, {key: 'value'});
        
        // Verify dispatch was called with correct parameters
        assert.equal(capturedMethod, 'post');
        assert.equal(capturedArgs[0], 'methodWithArgs');
        assert.deepEqual(capturedArgs[1], ['arg1', 42, {key: 'value'}]);
        
        result.then(function(value) {
            assert.equal(value, 'result with args');
            done();
        }).catch(done);
    });
    
    })