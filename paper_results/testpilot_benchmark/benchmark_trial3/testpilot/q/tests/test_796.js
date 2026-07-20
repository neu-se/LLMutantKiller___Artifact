let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q promise with function that throws error', function(done) {
        // Create a function that throws an error
        function divide(a, b) {
            if (b === 0) {
                throw new Error('Division by zero');
            }
            return a / b;
        }
        
        // Create a promise using Q.fcall
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