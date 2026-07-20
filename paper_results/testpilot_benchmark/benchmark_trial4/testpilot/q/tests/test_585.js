let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.isRejected', function(done) {
        // Test 1: Promise that is rejected should return true
        let rejectedPromise = q.reject(new Error('Test error'));
        
        // Give the promise a moment to settle
        setTimeout(() => {
            assert.strictEqual(rejectedPromise.isRejected(), true, 'Rejected promise should return true for isRejected()');
            
            // Test 2: Promise that is fulfilled should return false
            let fulfilledPromise = q.resolve('success');
            setTimeout(() => {
                assert.strictEqual(fulfilledPromise.isRejected(), false, 'Fulfilled promise should return false for isRejected()');
                
                // Test 3: Pending promise should return false
                let pendingPromise = q.defer().promise;
                assert.strictEqual(pendingPromise.isRejected(), false, 'Pending promise should return false for isRejected()');
                
                // Test 4: Promise rejected with different error types
                let rejectedWithString = q.reject('string error');
                setTimeout(() => {
                    assert.strictEqual(rejectedWithString.isRejected(), true, 'Promise rejected with string should return true for isRejected()');
                    
                    let rejectedWithNull = q.reject(null);
                    setTimeout(() => {
                        assert.strictEqual(rejectedWithNull.isRejected(), true, 'Promise rejected with null should return true for isRejected()');
                        done();
                    }, 0);
                }, 0);
            }, 0);
        }, 0);
    });
});