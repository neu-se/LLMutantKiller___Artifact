let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.isRejected', function(done) {
        // Test 1: Check that a rejected promise returns true
        let rejectedPromise = q.reject(new Error('Test error'));
        
        // Wait a bit for the promise to settle
        setTimeout(() => {
            assert.strictEqual(q.isRejected(rejectedPromise), true, 'Rejected promise should return true');
            
            // Test 2: Check that a fulfilled promise returns false
            let fulfilledPromise = q.resolve('success');
            setTimeout(() => {
                assert.strictEqual(q.isRejected(fulfilledPromise), false, 'Fulfilled promise should return false');
                
                // Test 3: Check that a pending promise returns false
                let pendingPromise = q.defer().promise;
                assert.strictEqual(q.isRejected(pendingPromise), false, 'Pending promise should return false');
                
                // Test 4: Check that a non-promise object returns false
                assert.strictEqual(q.isRejected({}), false, 'Non-promise object should return false');
                assert.strictEqual(q.isRejected('string'), false, 'String should return false');
                assert.strictEqual(q.isRejected(null), false, 'Null should return false');
                assert.strictEqual(q.isRejected(undefined), false, 'Undefined should return false');
                
                // Test 5: Check with a promise that gets rejected later
                let deferred = q.defer();
                assert.strictEqual(q.isRejected(deferred.promise), false, 'Promise should not be rejected initially');
                
                deferred.reject(new Error('Later rejection'));
                setTimeout(() => {
                    assert.strictEqual(q.isRejected(deferred.promise), true, 'Promise should be rejected after rejection');
                    done();
                }, 10);
            }, 10);
        }, 10);
    });
});