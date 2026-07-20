let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind', function(done) {
        // Create a mock function that follows Node.js callback convention
        function mockAsyncFunction(arg1, arg2, callback) {
            // Simulate async operation
            setTimeout(() => {
                if (arg1 === 'error') {
                    callback(new Error('Test error'));
                } else {
                    callback(null, `Result: ${arg1} + ${arg2}`);
                }
            }, 10);
        }

        // Create a mock object to test binding
        const mockObject = {
            value: 'test-context',
            asyncMethod: function(input, callback) {
                setTimeout(() => {
                    callback(null, `${this.value}: ${input}`);
                }, 10);
            }
        };

        // Create a promise from the mock function
        const promise = q.makePromise(mockAsyncFunction);
        
        // Test nbind without context
        const boundFunction = promise.nbind();
        
        boundFunction('hello', 'world')
            .then(result => {
                assert.strictEqual(result, 'Result: hello + world');
                
                // Test nbind with context and partial application
                const boundMethodWithContext = promise.nbind(mockObject, 'partial-arg');
                
                return boundMethodWithContext('additional-arg');
            })
            .then(result => {
                assert.strictEqual(result, 'Result: partial-arg + additional-arg');
                
                // Test with method that uses 'this' context
                const methodPromise = q.makePromise(mockObject.asyncMethod);
                const boundMethod = methodPromise.nbind(mockObject);
                
                return boundMethod('test-input');
            })
            .then(result => {
                assert.strictEqual(result, 'test-context: test-input');
                
                // Test error handling
                const errorBound = promise.nbind();
                return errorBound('error', 'test');
            })
            .then(() => {
                assert.fail('Should have thrown an error');
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Test error');
                done();
            })
            .catch(done);
    });

    })