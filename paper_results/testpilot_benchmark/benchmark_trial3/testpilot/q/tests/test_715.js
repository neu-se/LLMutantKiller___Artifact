let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.post with no arguments', function(done) {
        let mockPromise = Object.create(q.makePromise.prototype);
        
        let capturedArgs = null;
        mockPromise.dispatch = function(method, args) {
            capturedArgs = args;
            return q.resolve('success');
        };
        
        mockPromise.post('methodName');
        
        assert.deepStrictEqual(capturedArgs, ['methodName', undefined], 'should handle undefined args');
        done();
    });
    
    })