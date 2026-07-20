let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.dispatch - async execution', function(done) {
        let executionOrder = [];
        
        let mockPromise = {
            promiseDispatch: function(resolve, op, args) {
                executionOrder.push('promiseDispatch');
                resolve('async result');
            }
        };
        
        let dispatch = q.makePromise.prototype.dispatch.bind(mockPromise);
        
        executionOrder.push('before dispatch');
        let promise = dispatch('asyncOp', []);
        executionOrder.push('after dispatch');
        
        promise.then(function(result) {
            executionOrder.push('promise resolved');
            
            // Verify that promiseDispatch was called asynchronously
            assert.deepEqual(executionOrder, [
                'before dispatch',
                'after dispatch',
                'promiseDispatch',
                'promise resolved'
            ]);
            assert.equal(result, 'async result');
            done();
        }).catch(done);
    });
});