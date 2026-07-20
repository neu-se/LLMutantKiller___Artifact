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
        
        // Create a promise using makePromise
        let promiseFunction = q.makePromise(divide, function(a, b, callback) {
            try {
                let result = divide(a, b);
                callback(null, result);
            } catch (error) {
                callback(error);
            }
        });
        
        // Test fcall with arguments that cause error
        promiseFunction.fcall(10, 0)
            .then(function(result) {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert.strictEqual(error.message, 'Division by zero');
                done();
            });
    });
    
    })