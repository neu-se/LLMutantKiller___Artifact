let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind with partial argument binding', function(done) {
        // Function that takes multiple arguments
        function multiArgFunction(a, b, c, callback) {
            setTimeout(() => {
                callback(null, a + b + c);
            }, 10);
        }
        
        // Use q.nbind directly for partial binding
        const partiallyBound = q.nbind(multiArgFunction, null, 1, 2);
        
        // Call with remaining argument
        partiallyBound(3)
            .then(result => {
                assert.strictEqual(result, 6);
                done();
            })
            .catch(done);
    });
});