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
                
                // Test invoking an async method
                return promise.invoke('asyncMethod', 10);
            })
            .then(function(result) {
                assert.equal(result, 20);
                
                // Test invoking with no additional arguments
                let noArgsObj = {
                    getValue: function() {
                        return 42;
                    }
                };
                return q(noArgsObj).invoke('getValue');
            })
            .then(function(result) {
                assert.equal(result, 42);
                done();
            })
            .catch(done);
    });

    })