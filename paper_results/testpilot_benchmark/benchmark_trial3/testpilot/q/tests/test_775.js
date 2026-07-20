let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fapply', function(done) {
        // Test 1: Basic function application with arguments
        let testFunction = function(a, b, c) {
            return a + b + c;
        };
        
        let promise = q(testFunction);
        
        promise.fapply([1, 2, 3])
            .then(function(result) {
                assert.equal(result, 6);
                return testFunction;
            })
            .then(function(func) {
                // Test 2: Function application with no arguments
                let noArgFunction = function() {
                    return 'hello world';
                };
                let noArgPromise = q(noArgFunction);
                return noArgPromise.fapply([]);
            })
            .then(function(result) {
                assert.equal(result, 'hello world');
                
                // Test 3: Function application with array manipulation
                let arrayFunction = function(arr) {
                    return arr.map(x => x * 2);
                };
                let arrayPromise = q(arrayFunction);
                return arrayPromise.fapply([[1, 2, 3]]);
            })
            .then(function(result) {
                assert.deepEqual(result, [2, 4, 6]);
                
                // Test 4: Function that returns a promise
                let promiseReturningFunction = function(value) {
                    return q.delay(10).then(() => value * 10);
                };
                let promisePromise = q(promiseReturningFunction);
                return promisePromise.fapply([5]);
            })
            .then(function(result) {
                assert.equal(result, 50);
                
                // Test 5: Error handling
                let errorFunction = function(shouldThrow) {
                    if (shouldThrow) {
                        throw new Error('Test error');
                    }
                    return 'success';
                };
                let errorPromise = q(errorFunction);
                return errorPromise.fapply([true])
                    .then(function() {
                        assert.fail('Should have thrown an error');
                    })
                    .catch(function(error) {
                        assert.equal(error.message, 'Test error');
                        return 'error handled';
                    });
            })
            .then(function(result) {
                assert.equal(result, 'error handled');
                done();
            })
            .catch(done);
    });
});