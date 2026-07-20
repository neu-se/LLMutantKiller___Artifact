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
        
        // Use q.nbind to create a promise-returning function with bound context
        const boundFunction = q.nbind(testObject.multiply, testObject);
        
        // Test the bound function with the argument
        boundFunction(5)
            .then(result => {
                assert.strictEqual(result, 50);
                done();
            })
            .catch(done);
    });
});