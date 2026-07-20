let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind with this context', function(done) {
        // Create an object with a method
        const testObject = {
            multiplier: 10,
            multiply: function(value, callback) {
                setTimeout(() => {
                    callback(null, value * this.multiplier);
                }, 10);
            }
        };
        
        // Create a promise-returning function
        const promiseFunction = q.makePromise(testObject.multiply);
        
        // Bind with this context and argument
        const boundFunction = promiseFunction.nbind(testObject, 5);
        
        // Test the bound function
        boundFunction()
            .then(result => {
                assert.strictEqual(result, 50);
                done();
            })
            .catch(done);
    });

    })