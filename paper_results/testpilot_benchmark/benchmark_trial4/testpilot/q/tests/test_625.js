let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.dispatch - parameters passed correctly', function(done) {
        let capturedOp, capturedArgs;
        
        let mockPromise = {
            promiseDispatch: function(resolve, op, args) {
                capturedOp = op;
                capturedArgs = args;
                resolve('params captured');
            }
        };
        
        let dispatch = q.makePromise.prototype.dispatch.bind(mockPromise);
        let testArgs = ['param1', 42, {key: 'value'}];
        
        let promise = dispatch('testOperation', testArgs);
        
        promise.then(function(result) {
            assert.equal(capturedOp, 'testOperation');
            assert.deepEqual(capturedArgs, testArgs);
            done();
        }).catch(done);
    });

    })