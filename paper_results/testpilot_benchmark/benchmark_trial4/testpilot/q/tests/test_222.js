let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.all preserves order', function(done) {
        let promise1 = q.delay(30).then(() => 'first');
        let promise2 = q.delay(10).then(() => 'second');
        let promise3 = q.delay(20).then(() => 'third');
        
        q.Promise.all([promise1, promise2, promise3])
            .then(function(results) {
                assert.deepEqual(results, ['first', 'second', 'third']);
                done();
            })
            .catch(done);
    });
});