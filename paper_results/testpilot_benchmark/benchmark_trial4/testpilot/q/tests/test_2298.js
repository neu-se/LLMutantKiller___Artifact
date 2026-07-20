let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nbind with this context', function(done) {
        const testObject = {
            multiplier: 3,
            calculate: function(value, callback) {
                setTimeout(() => {
                    callback(null, value * this.multiplier);
                }, 10);
            }
        };
        
        // Bind with specific 'this' context
        const boundFunction = q.nbind(testObject.calculate, testObject);
        
        boundFunction(4)
            .then(result => {
                assert.strictEqual(result, 12);
                done();
            })
            .catch(done);
    });
});