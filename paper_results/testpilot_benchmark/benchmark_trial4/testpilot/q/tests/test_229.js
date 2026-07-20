let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.all with mixed values and promises', function(done) {
        let promise1 = q.resolve(1);
        let value2 = 2;
        let promise3 = q.resolve(3);
        
        q.Promise.all([promise1, value2, promise3])
            .then(function(results) {
                assert.deepEqual(results, [1, 2, 3]);
                done();
            })
            .catch(done);
    });
});