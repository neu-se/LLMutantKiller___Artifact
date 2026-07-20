let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.isRejected', function(done) {
        // Test 1: Check that a rejected promise returns true
        let rejectedPromise = q.reject(new Error('Test error'));
        
        // Wait a bit for the promise to settle
        setTimeout(() => {
            assert.strictEqual(q.isRejected(rejectedPromise), true, 'Rejected promise should return true');
            
            // Test 2: Check that a resolved promise returns false
            let resolvedPromise = q.resolve('success');
            setTimeout(() => {
                assert.strictEqual(q.isRejected(resolvedPromise), false, 'Resolved promise should return false');
                
                // Test 3: Check that a pending promise returns false
                let pendingPromise = q.defer().promise;
                assert.strictEqual(q.isRejected(pendingPromise), false, 'Pending promise should return false');
                
                // Test 4: Check that a non-promise object returns false
                assert.strictEqual(q.isRejected({}), false, 'Non-promise object should return false');
                assert.strictEqual(q.isRejected('string'), false, 'String should return false');
                assert.strictEqual(q.isRejected(null), false, 'Null should return false');
                assert.strictEqual(q.isRejected(undefined), false, 'Undefined should return false');
                
                // Test 5: Check that a promise rejected with different types of values
                let rejectedWithString = q.reject('error string');
                let rejectedWithNumber = q.reject(404);
                let rejectedWithNull = q.reject(null);
                
                setTimeout(() => {
                    assert.strictEqual(q.isRejected(rejectedWithString), true, 'Promise rejected with string should return true');
                    assert.strictEqual(q.isRejected(rejectedWithNumber), true, 'Promise rejected with number should return true');
                    assert.strictEqual(q.isRejected(rejectedWithNull), true, 'Promise rejected with null should return true');
                    
                    done();
                }, 10);
            }, 10);
        }, 10);
    });
});