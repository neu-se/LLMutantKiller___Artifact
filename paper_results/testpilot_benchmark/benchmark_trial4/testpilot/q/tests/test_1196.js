let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind with multiple arguments', function(done) {
        // Mock function that takes multiple arguments
        function multiArgFunction(a, b, c, d, callback) {
            setTimeout(() => {
                callback(null, [a, b, c, d].join('-'));
            }, 10);
        }

        const promise = q.makePromise(multiArgFunction);
        
        // Test nbind with partial application of multiple arguments
        const boundFunction = promise.nbind(null, 'arg1', 'arg2');
        
        boundFunction('arg3', 'arg4')
            .then(result => {
                assert.strictEqual(result, 'arg1-arg2-arg3-arg4');
                done();
            })
            .catch(done);
    });
});