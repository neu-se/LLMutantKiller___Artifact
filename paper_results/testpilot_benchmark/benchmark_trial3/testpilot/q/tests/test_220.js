let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.all with delayed promises', function(done) {
        let promise1 = q.delay(10).then(() => 1);
        let promise2 = q.delay(20).then(() => 2);
        let promise3 = q.delay(5).then(() => 3);
        
        q.Promise.all([promise1, promise2, promise3])
            .then(function(results) {
                assert.deepEqual(results, [1, 2, 3]);
                done();
            })
            .catch(done);
    });
});