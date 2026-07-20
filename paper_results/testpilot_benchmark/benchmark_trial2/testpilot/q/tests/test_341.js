let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind with multiple pre-bound arguments', function(done) {
        // Create a function that takes multiple arguments
        function multiArgFunction(a, b, c, d, callback) {
            setTimeout(() => {
                callback(null, a + b + c + d);
            }, 10);
        }
        
        // Use nbind correctly - bind the function to an object (or null) and pre-bind arguments
        const boundFunction = q.nbind(multiArgFunction, null, 1, 2);
        
        boundFunction(3, 4)
            .then(result => {
                assert.strictEqual(result, 10);
                done();
            })
            .catch(done);
    });
});