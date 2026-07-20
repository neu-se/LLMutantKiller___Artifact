let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fapply', function(done) {
        // Test 1: fapply with a function that returns a value
        let testFunction = function(a, b, c) {
            return a + b + c;
        };
        
        let promise = q(testFunction);
        promise.fapply([1, 2, 3])
            .then(function(result) {
                assert.equal(result, 6);
                return testNextCase();
            })
            .catch(done);
        
        function testNextCase() {
            // Test 2: fapply with a function that returns a promise
            let asyncFunction = function(x, y) {
                return q.delay(10).then(function() {
                    return x * y;
                });
            };
            
            let asyncPromise = q(asyncFunction);
            return asyncPromise.fapply([4, 5])
                .then(function(result) {
                    assert.equal(result, 20);
                    return testErrorCase();
                });
        }
        
        function testErrorCase() {
            // Test 3: fapply with a function that throws an error
            let errorFunction = function(msg) {
                throw new Error(msg);
            };
            
            let errorPromise = q(errorFunction);
            return errorPromise.fapply(['test error'])
                .then(function() {
                    assert.fail('Should have thrown an error');
                })
                .catch(function(error) {
                    assert.equal(error.message, 'test error');
                    return testEmptyArgs();
                });
        }
        
        function testEmptyArgs() {
            // Test 4: fapply with empty arguments array
            let noArgsFunction = function() {
                return 'no args';
            };
            
            let noArgsPromise = q(noArgsFunction);
            return noArgsPromise.fapply([])
                .then(function(result) {
                    assert.equal(result, 'no args');
                    done();
                });
        }
    });
});