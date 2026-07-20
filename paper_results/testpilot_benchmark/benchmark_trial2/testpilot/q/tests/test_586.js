let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfapply', function(done) {
        // Test 1: Basic callback with success
        function mockCallback(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, arg1 + arg2);
            }, 10);
        }

        q.nfapply(mockCallback, ['hello', ' world'])
            .then(result => {
                assert.strictEqual(result, 'hello world');
                
                // Test 2: Callback with error
                function errorCallback(arg, callback) {
                    setTimeout(() => {
                        callback(new Error('Test error'));
                    }, 10);
                }

                return q.nfapply(errorCallback, ['test']);
            })
            .then(() => {
                assert.fail('Should have thrown an error');
            })
            .catch(err => {
                assert.strictEqual(err.message, 'Test error');
                
                // Test 3: Callback with multiple arguments
                function multiArgCallback(a, b, c, callback) {
                    setTimeout(() => {
                        callback(null, a * b + c);
                    }, 10);
                }

                return q.nfapply(multiArgCallback, [2, 3, 4]);
            })
            .then(result => {
                assert.strictEqual(result, 10);
                
                // Test 4: Empty arguments array
                function noArgsCallback(callback) {
                    setTimeout(() => {
                        callback(null, 'no args');
                    }, 10);
                }

                return q.nfapply(noArgsCallback, []);
            })
            .then(result => {
                assert.strictEqual(result, 'no args');
                done();
            })
            .catch(done);
    });
});