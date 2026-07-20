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
                
                // Test 2: Function with no arguments
                let noArgFunction = function() {
                    return 'hello world';
                };
                
                let promise2 = q(noArgFunction);
                return promise2.fapply([]);
            })
            .then(function(result) {
                assert.equal(result, 'hello world');
                
                // Test 3: Function that returns a promise
                let asyncFunction = function(value) {
                    return q.delay(10).then(function() {
                        return value * 2;
                    });
                };
                
                let promise3 = q(asyncFunction);
                return promise3.fapply([5]);
            })
            .then(function(result) {
                assert.equal(result, 10);
                
                // Test 4: Function with multiple argument types
                let mixedArgsFunction = function(str, num, bool) {
                    return str + num + bool;
                };
                
                let promise4 = q(mixedArgsFunction);
                return promise4.fapply(['test', 42, true]);
            })
            .then(function(result) {
                assert.equal(result, 'test42true');
                
                // Test 5: Function that throws an error
                let errorFunction = function(shouldThrow) {
                    if (shouldThrow) {
                        throw new Error('Test error');
                    }
                    return 'success';
                };
                
                let promise5 = q(errorFunction);
                return promise5.fapply([true])
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