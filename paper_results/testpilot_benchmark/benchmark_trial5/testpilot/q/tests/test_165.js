let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.invoke', function(done) {
        // Test 1: Basic invoke functionality
        let testObj = {
            greet: function(name, greeting) {
                return greeting + ', ' + name + '!';
            },
            add: function(a, b) {
                return a + b;
            },
            asyncMethod: function(value) {
                return q.delay(10).then(() => value * 2);
            }
        };
        
        let promise = q(testObj);
        
        // Test invoking a method with multiple arguments
        promise.invoke('greet', 'World', 'Hello')
            .then(function(result) {
                assert.equal(result, 'Hello, World!');
                
                // Test invoking a method with numeric arguments
                return promise.invoke('add', 5, 3);
            })
            .then(function(result) {
                assert.equal(result, 8);
                
                // Test invoking a method with no additional arguments
                return promise.invoke('add', 10, 20);
            })
            .then(function(result) {
                assert.equal(result, 30);
                
                // Test invoking an async method
                return promise.invoke('asyncMethod', 5);
            })
            .then(function(result) {
                assert.equal(result, 10);
                done();
            })
            .catch(done);
    });
    
    })