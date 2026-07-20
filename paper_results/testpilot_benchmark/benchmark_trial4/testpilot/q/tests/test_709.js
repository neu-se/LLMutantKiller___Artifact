let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.post with null arguments', function(done) {
        let mockPromise = Object.create(q.makePromise.prototype);
        
        let capturedArgs = null;
        mockPromise.dispatch = function(method, args) {
            capturedArgs = args;
            return q.resolve('success');
        };
        
        mockPromise.post('methodName', null);
        
        assert.deepStrictEqual(capturedArgs, ['methodName', null], 'should handle null args');
        done();
    });
    
    })