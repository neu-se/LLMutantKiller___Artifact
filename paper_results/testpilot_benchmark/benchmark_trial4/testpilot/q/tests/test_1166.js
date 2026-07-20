let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify', function(done) {
        // Create a mock Node.js-style function that takes a callback
        function mockAsyncFunction(value, callback) {
            setTimeout(() => {
                if (value === 'error') {
                    callback(new Error('Test error'));
                } else {
                    callback(null, 'Result: ' + value);
                }
            }, 10);
        }

        // Create a promise and use denodeify on it
        let promise = q.makePromise(function(resolve, reject) {
            resolve('test');
        });

        // Test denodeify method
        let denodeified = promise.denodeify(mockAsyncFunction);
        
        // Test successful case
        denodeified('hello')
            .then(result => {
                assert.strictEqual(result, 'Result: hello');
                
                // Test error case
                return denodeified('error');
            })
            .then(() => {
                assert.fail('Should have thrown an error');
            })
            .catch(err => {
                assert.strictEqual(err.message, 'Test error');
                done();
            })
            .catch(done);
    });

    })