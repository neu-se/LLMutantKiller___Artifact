let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.delay', function(done) {
        this.timeout(5000); // Set a reasonable timeout for async tests
        
        // Test 1: Basic delay functionality
        const startTime = Date.now();
        const delayMs = 100;
        
        q.resolve('test value')
            .delay(delayMs)
            .then(function(value) {
                const elapsed = Date.now() - startTime;
                assert(elapsed >= delayMs, 'Delay should be at least ' + delayMs + 'ms');
                assert.strictEqual(value, 'test value', 'Value should be preserved after delay');
                
                // Test 2: Delay with rejected promise
                return q.reject(new Error('test error')).delay(50);
            })
            .then(function() {
                assert.fail('Should not resolve when original promise is rejected');
            })
            .catch(function(error) {
                assert.strictEqual(error.message, 'test error', 'Error should be preserved after delay');
                
                // Test 3: Delay with zero timeout
                const zeroDelayStart = Date.now();
                return q.resolve('zero delay').delay(0);
            })
            .then(function(value) {
                const elapsed = Date.now() - startTime;
                assert.strictEqual(value, 'zero delay', 'Value should be preserved with zero delay');
                
                // Test 4: Chaining multiple delays
                return q.resolve('chained')
                    .delay(50)
                    .delay(50);
            })
            .then(function(value) {
                assert.strictEqual(value, 'chained', 'Value should be preserved through multiple delays');
                
                // Test 5: Delay with undefined value
                return q.resolve().delay(50);
            })
            .then(function(value) {
                assert.strictEqual(value, undefined, 'Undefined value should be preserved');
                done();
            })
            .catch(done);
    });
    
    })