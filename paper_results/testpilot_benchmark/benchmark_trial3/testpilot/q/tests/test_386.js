let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.join - should handle undefined values', function(done) {
        let promise1 = q.resolve(undefined);
        let promise2 = q.resolve(undefined);
        
        q.all([promise1, promise2])
            .then(function(result) {
                assert.strictEqual(result[0], undefined);
                assert.strictEqual(result[1], undefined);
                done();
            })
            .catch(done);
    });
});