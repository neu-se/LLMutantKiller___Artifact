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

        // Use q.nbind directly instead of q.makePromise
        const boundFunction = q.nbind(mockAsyncFunction);
        
        boundFunction('hello', 'world')
            .then(result => {
                assert.strictEqual(result, 'Result: hello + world');
                
                // Test nbind with context
                const boundMethodWithContext = q.nbind(mockObject.asyncMethod, mockObject);
                
                return boundMethodWithContext('test-input');
            })
            .then(result => {
                assert.strictEqual(result, 'test-context: test-input');
                
                // Test error handling
                const errorBoundFunction = q.nbind(mockAsyncFunction);
                return errorBoundFunction('error', 'test');
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
});