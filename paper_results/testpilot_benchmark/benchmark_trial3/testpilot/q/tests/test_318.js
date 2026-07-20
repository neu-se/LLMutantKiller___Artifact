let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with same resolved values', function(done) {
        let promise1 = q.resolve(42);
        let promise2 = q.resolve(42);
        
        q.join(promise1, promise2)
            .then(function(result) {
                assert.strictEqual(result, 42);
                done();
            })
            .catch(done);
    });
});