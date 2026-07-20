let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.isFulfilled', function(done) {
        // Test 1: Promise that is fulfilled should return true
        let fulfilledPromise = q.resolve("test value");
        
        // Give it a moment to settle
        setTimeout(() => {
            assert.strictEqual(fulfilledPromise.isFulfilled(), true, 'Fulfilled promise should return true');
            
            // Test 2: Promise that is rejected should return false
            let rejectedPromise = q.reject(new Error("test error"));
            
            setTimeout(() => {
                assert.strictEqual(rejectedPromise.isFulfilled(), false, 'Rejected promise should return false');
                
                // Test 3: Promise that is still pending should return false
                let pendingPromise = q.defer().promise;
                assert.strictEqual(pendingPromise.isFulfilled(), false, 'Pending promise should return false');
                
                // Test 4: Promise fulfilled with undefined should return true
                let undefinedPromise = q.resolve(undefined);
                
                setTimeout(() => {
                    assert.strictEqual(undefinedPromise.isFulfilled(), true, 'Promise fulfilled with undefined should return true');
                    
                    // Test 5: Promise fulfilled with null should return true
                    let nullPromise = q.resolve(null);
                    
                    setTimeout(() => {
                        assert.strictEqual(nullPromise.isFulfilled(), true, 'Promise fulfilled with null should return true');
                        done();
                    }, 0);
                }, 0);
            }, 0);
        }, 0);
    });
});