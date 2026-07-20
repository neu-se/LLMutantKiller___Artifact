let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify - multiple arguments to promisified function', function(done) {
        // Create a function that sums all numeric arguments
        function sumFunction(a, b, c, callback) {
            setTimeout(() => {
                callback(null, a + b + c);
            }, 10);
        }
        
        const promisified = q.denodeify(sumFunction);
        
        promisified(1, 2, 3)
            .then(result => {
                assert.strictEqual(result, 6);
                done();
            })
            .catch(done);
    });
});