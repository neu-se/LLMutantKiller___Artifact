let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.all - resolves when all promises resolve', function(done) {
        let promise1 = q.resolve(1);
        let promise2 = q.resolve(2);
        let promise3 = q.resolve(3);
        
        q.all([promise1, promise2, promise3])
            .then(function(results) {
                assert.deepEqual(results, [1, 2, 3]);
                done();
            })
            .catch(done);
    });
});