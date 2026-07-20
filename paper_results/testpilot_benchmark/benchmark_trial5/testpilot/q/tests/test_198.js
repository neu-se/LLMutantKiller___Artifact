let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fcall with function that throws error', function(done) {
        // Create a function that throws an error
        function divide(a, b) {
            if (b === 0) {
                throw new Error('Division by zero');
            }
            return a / b;
        }
        
        // Create a promisified version using Q.denodeify or Q.nfcall
        // Since we want to test fcall, let's create a promise-returning function
        function promisifiedDivide(a, b) {
            return q.fcall(divide, a, b);
        }
        
        // Test fcall with arguments that cause error
        promisifiedDivide(10, 0)
            .then(function(result) {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert.strictEqual(error.message, 'Division by zero');
                done();
            });
    });
});