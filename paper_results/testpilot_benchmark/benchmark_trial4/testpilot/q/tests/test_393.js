let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.all - null values', function(done) {
        let promise1 = q.resolve(null);
        let promise2 = q.resolve(null);
        
        q.all([promise1, promise2])
            .then(function(result) {
                assert.strictEqual(result[0], null);
                assert.strictEqual(result[1], null);
                done();
            })
            .catch(done);
    });
});