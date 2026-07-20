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
        
        // Create a promisified version using Q.nfcall or Q.fcall
        // Since we want to test error handling, we'll use Q.fcall which directly calls the function
        q.fcall(divide, 10, 0)
            .then(function(result) {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert.strictEqual(error.message, 'Division by zero');
                done();
            });
    });
});