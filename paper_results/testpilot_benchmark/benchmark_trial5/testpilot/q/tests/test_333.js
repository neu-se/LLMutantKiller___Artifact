let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind with context binding', function(done) {
        // Create an object with a method
        const testObject = {
            multiplier: 10,
            multiply: function(value, callback) {
                setTimeout(() => {
                    callback(null, value * this.multiplier);
                }, 10);
            }
        };
        
        // Use q.nbind directly to bind context and create promise function
        const boundFunction = q.nbind(testObject.multiply, testObject, 5);
        
        boundFunction()
            .then(result => {
                assert.strictEqual(result, 50);
                done();
            })
            .catch(done);
    });
});