let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.any - resolves with first fulfilled promise', function(done) {
        let promise1 = q.delay(100).then(() => 'first');
        let promise2 = q.delay(50).then(() => 'second');
        let promise3 = q.delay(200).then(() => 'third');
        
        q.any([promise1, promise2, promise3]).then(function(result) {
            assert.equal(result, 'second');
            done();
        }).catch(done);
    });
});