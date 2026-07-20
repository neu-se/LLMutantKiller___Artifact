let mocha = require('mocha');
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
                return testAsyncFunction();
            })
            .then(function() {
                return testWithNoArgs();
            })
            .then(function() {
                return testWithPromiseArgs();
            })
            .then(function() {
                done();
            })
            .catch(done);
        
        // Test 2: fapply with a function that returns a promise
        function testAsyncFunction() {
            let asyncFunction = function(x, y) {
                return q.delay(10).then(function() {
                    return x * y;
                });
            };
            
            let asyncPromise = q(asyncFunction);
            return asyncPromise.fapply([4, 5])
                .then(function(result) {
                    assert.equal(result, 20);
                });
        }
        
        // Test 3: fapply with no arguments
        function testWithNoArgs() {
            let noArgFunction = function() {
                return 'hello world';
            };
            
            let noArgPromise = q(noArgFunction);
            return noArgPromise.fapply([])
                .then(function(result) {
                    assert.equal(result, 'hello world');
                });
        }
        
        // Test 4: fapply with promise arguments
        function testWithPromiseArgs() {
            let sumFunction = function(a, b) {
                return a + b;
            };
            
            let promiseFunc = q(sumFunction);
            return promiseFunc.fapply([q(10), q(20)])
                .then(function(result) {
                    assert.equal(result, 30);
                });
        }
    });
    
    })