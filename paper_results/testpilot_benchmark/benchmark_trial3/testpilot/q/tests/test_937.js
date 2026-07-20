let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.allSettled with mixed fulfilled and rejected promises', function(done) {
        let promise1 = q.resolve(42);
        let promise2 = q.reject(new Error('test error'));
        let promise3 = q.resolve('hello');
        let promise4 = q.reject('simple rejection');
        
        let promises = [promise1, promise2, promise3, promise4];
        
        q.allSettled(promises).then(function(results) {
            try {
                assert.equal(results.length, 4);
                
                // Check first promise (fulfilled)
                assert.equal(results[0].state, 'fulfilled');
                assert.equal(results[0].value, 42);
                
                // Check second promise (rejected)
                assert.equal(results[1].state, 'rejected');
                assert.equal(results[1].reason.message, 'test error');
                
                // Check third promise (fulfilled)
                assert.equal(results[2].state, 'fulfilled');
                assert.equal(results[2].value, 'hello');
                
                // Check fourth promise (rejected)
                assert.equal(results[3].state, 'rejected');
                assert.equal(results[3].reason, 'simple rejection');
                
                done();
            } catch (error) {
                done(error);
            }
        }).catch(done);
    });
});