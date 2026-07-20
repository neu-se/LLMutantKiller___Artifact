let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind with context binding', function(done) {
        // Create an object with a method
        const testObject = {
            value: 42,
            getValue: function(multiplier, callback) {
                setTimeout(() => {
                    callback(null, this.value * multiplier);
                }, 10);
            }
        };
        
        // Bind the method with context
        const boundFunction = q.makePromise(testObject.getValue).nbind(testObject, 2);
        
        boundFunction()
            .then(result => {
                assert.strictEqual(result, 84);
                done();
            })
            .catch(done);
    });
});