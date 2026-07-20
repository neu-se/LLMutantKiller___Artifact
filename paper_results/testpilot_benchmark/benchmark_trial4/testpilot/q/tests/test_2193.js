let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfapply with numeric arguments', function(done) {
        // Mock function that performs calculation
        function mockCalculation(a, b, c, callback) {
            setTimeout(() => {
                callback(null, a * b + c);
            }, 10);
        }

        q.nfapply(mockCalculation, [5, 3, 2])
            .then(function(result) {
                assert.strictEqual(result, 17);
                done();
            })
            .catch(done);
    });
});