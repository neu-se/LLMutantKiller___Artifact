let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.invoke with multiple arguments', function(done) {
        let mockPromise = Object.create(q.makePromise.prototype);
        
        let capturedMethod, capturedArgs;
        mockPromise.dispatch = function(method, args) {
            capturedMethod = method;
            capturedArgs = args;
            return q.resolve('result with multiple args');
        };
        
        mockPromise.invoke('multiArgMethod', 'arg1', 42, {key: 'value'}).then(function(result) {
            assert.equal(capturedMethod, 'post');
            assert.equal(capturedArgs[0], 'multiArgMethod');
            assert.deepEqual(capturedArgs[1], ['arg1', 42, {key: 'value'}]);
            assert.equal(result, 'result with multiple args');
            done();
        }).catch(done);
    });
    
    })