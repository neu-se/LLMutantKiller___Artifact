let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.invoke', function(done) {
        // Test 1: Basic invoke functionality
        let testObject = {
            add: function(a, b) {
                return a + b;
            },
            multiply: function(a, b, c) {
                return a * b * c;
            },
            getName: function() {
                return 'testObject';
            }
        };

        let promise = q(testObject);

        // Test invoking method with multiple arguments
        promise.invoke('add', 5, 3)
            .then(function(result) {
                assert.equal(result, 8, 'invoke should call add method with arguments');
                
                // Test invoking method with more arguments
                return promise.invoke('multiply', 2, 3, 4);
            })
            .then(function(result) {
                assert.equal(result, 24, 'invoke should call multiply method with multiple arguments');
                
                // Test invoking method with no arguments
                return promise.invoke('getName');
            })
            .then(function(result) {
                assert.equal(result, 'testObject', 'invoke should call method with no arguments');
                done();
            })
            .catch(done);
    });

    })