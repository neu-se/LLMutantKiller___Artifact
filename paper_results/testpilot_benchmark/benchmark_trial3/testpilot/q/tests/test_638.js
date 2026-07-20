let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.dispatch - passes correct arguments', function(done) {
        let capturedOp, capturedArgs;
        
        let mockPromise = {
            promiseDispatch: function(resolve, op, args) {
                capturedOp = op;
                capturedArgs = args;
                resolve('captured');
            }
        };
        
        let dispatch = q.makePromise.prototype.dispatch.bind(mockPromise);
        let testArgs = ['test', 123, {key: 'value'}];
        
        let promise = dispatch('myOperation', testArgs);
        
        promise.then(function(result) {
            assert.equal(capturedOp, 'myOperation');
            assert.deepEqual(capturedArgs, testArgs);
            done();
        }).catch(done);
    });
});