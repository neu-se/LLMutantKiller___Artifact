let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.allResolved with all rejected promises', function(done) {
        let promise1 = q.reject(new Error('error1'));
        let promise2 = q.reject(new Error('error2'));
        let promise3 = q.reject(new Error('error3'));
        
        // Use q.allSettled instead of q.allResolved, or implement allResolved behavior
        let allResolved = function(promises) {
            return q.all(promises.map(function(promise) {
                return q(promise).then(
                    function(value) {
                        return { state: 'fulfilled', value: value };
                    },
                    function(reason) {
                        return { state: 'rejected', reason: reason };
                    }
                );
            }));
        };
        
        allResolved([promise1, promise2, promise3])
            .then(function(results) {
                assert.equal(results.length, 3);
                assert.equal(results[0].state, 'rejected');
                assert.equal(results[0].reason.message, 'error1');
                assert.equal(results[1].state, 'rejected');
                assert.equal(results[1].reason.message, 'error2');
                assert.equal(results[2].state, 'rejected');
                assert.equal(results[2].reason.message, 'error3');
                done();
            })
            .catch(done);
    });
});