let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify', function(done) {
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

        // Use Q.denodeify to convert the callback-based function to promise-based
        let denodeified = q.denodeify(mockAsyncFunction);
        
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
});