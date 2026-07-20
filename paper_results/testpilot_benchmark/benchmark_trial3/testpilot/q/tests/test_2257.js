let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify - multiple return values', function(done) {
        // Create a function that returns multiple values
        function multiValueFunction(callback) {
            setTimeout(() => {
                callback(null, 'first', 'second', 'third');
            }, 10);
        }
        
        const promisified = q.denodeify(multiValueFunction);
        
        // Test that only the first value is returned (standard Promise behavior)
        promisified()
            .then(result => {
                assert.strictEqual(result, 'first');
                done();
            })
            .catch(done);
    });
});