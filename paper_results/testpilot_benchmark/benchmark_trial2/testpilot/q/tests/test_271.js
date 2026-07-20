let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply - multiple arguments', function(done) {
        // Create a mock function that takes multiple arguments
        function mockMultiArgFunction(a, b, c, d, callback) {
            setTimeout(() => {
                callback(null, a * b + c * d);
            }, 10);
        }
        
        // Use q.nfapply directly with the original function
        q.nfapply(mockMultiArgFunction, [2, 3, 4, 5])
            .then(result => {
                assert.strictEqual(result, 26); // 2*3 + 4*5 = 6 + 20 = 26
                done();
            })
            .catch(done);
    });
});