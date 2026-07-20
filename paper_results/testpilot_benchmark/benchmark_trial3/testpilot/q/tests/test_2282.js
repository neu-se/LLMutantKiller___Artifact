let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nbind with context binding', function(done) {
        const context = { multiplier: 2 };
        
        function contextFunction(value, callback) {
            setTimeout(() => {
                callback(null, value * this.multiplier);
            }, 10);
        }
        
        const boundFunction = q.nbind(contextFunction, context);
        
        boundFunction(5)
            .then(result => {
                assert.strictEqual(result, 10);
                done();
            })
            .catch(done);
    });
});