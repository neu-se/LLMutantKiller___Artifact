let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.post - method with error', function(done) {
        // Create a mock object with a method that returns an error
        let mockObject = {
            divide: function(a, b, callback) {
                setTimeout(() => {
                    if (b === 0) {
                        callback(new Error('Division by zero'));
                    } else {
                        callback(null, a / b);
                    }
                }, 10);
            }
        };
        
        let promiseObject = q.makePromise(mockObject);
        
        promiseObject.post('divide', [10, 0])
            .then(function(result) {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert.strictEqual(error.message, 'Division by zero');
                done();
            });
    });

    })