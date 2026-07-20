let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.allSettled', function() {
        
        it('should resolve with mixed fulfilled and rejected promises', function(done) {
            let promise1 = q.resolve('success');
            let promise2 = q.reject(new Error('failure'));
            let promise3 = q.resolve(42);
            
            q.allSettled([promise1, promise2, promise3])
                .then(function(results) {
                    assert.equal(results.length, 3);
                    assert.equal(results[0].state, 'fulfilled');
                    assert.equal(results[0].value, 'success');
                    assert.equal(results[1].state, 'rejected');
                    assert.equal(results[1].reason.message, 'failure');
                    assert.equal(results[2].state, 'fulfilled');
                    assert.equal(results[2].value, 42);
                    done();
                })
                .catch(done);
        });

            })
})