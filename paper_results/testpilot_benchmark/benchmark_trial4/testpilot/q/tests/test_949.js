let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.allSettled', function() {
        
        it('should resolve with all rejected promises', function(done) {
            let promise1 = q.reject(new Error('error1'));
            let promise2 = q.reject(new Error('error2'));
            
            q.allSettled([promise1, promise2])
                .then(function(results) {
                    assert.equal(results.length, 2);
                    assert.equal(results[0].state, 'rejected');
                    assert.equal(results[0].reason.message, 'error1');
                    assert.equal(results[1].state, 'rejected');
                    assert.equal(results[1].reason.message, 'error2');
                    done();
                })
                .catch(done);
        });

    });
});