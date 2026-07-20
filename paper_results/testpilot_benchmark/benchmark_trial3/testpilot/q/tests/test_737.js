let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.invoke with single argument', function(done) {
        let mockPromise = Object.create(q.makePromise.prototype);
        
        let capturedMethod, capturedArgs;
        mockPromise.dispatch = function(method, args) {
            capturedMethod = method;
            capturedArgs = args;
            return q.resolve('result with args');
        };
        
        mockPromise.invoke('methodWithArg', 'arg1').then(function(result) {
            assert.equal(capturedMethod, 'post');
            assert.equal(capturedArgs[0], 'methodWithArg');
            assert.deepEqual(capturedArgs[1], ['arg1']);
            assert.equal(result, 'result with args');
            done();
        }).catch(done);
    });
    
    })