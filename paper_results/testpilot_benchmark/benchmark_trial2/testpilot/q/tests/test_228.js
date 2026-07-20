let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.allResolved', function() {
        
        it('should handle rejected promises without failing', function(done) {
            let promise1 = q.resolve(1);
            let promise2 = q.reject(new Error('test error'));
            let promise3 = q.resolve(3);
            
            q.allSettled([promise1, promise2, promise3])
                .then(function(results) {
                    assert.equal(results.length, 3);
                    assert.equal(results[0].state, 'fulfilled');
                    assert.equal(results[0].value, 1);
                    assert.equal(results[1].state, 'rejected');
                    assert.equal(results[1].reason.message, 'test error');
                    assert.equal(results[2].state, 'fulfilled');
                    assert.equal(results[2].value, 3);
                    done();
                })
                .catch(done);
        });

    })
})