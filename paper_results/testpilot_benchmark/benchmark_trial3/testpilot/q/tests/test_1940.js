let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should resolve with first fulfilled promise', function(done) {
        let promise1 = q.delay(100).then(() => { throw new Error('first error'); });
        let promise2 = q.delay(50).then(() => 'second result');
        let promise3 = q.delay(200).then(() => 'third result');
        
        q.any([promise1, promise2, promise3])
            .then(result => {
                assert.equal(result, 'second result');
                done();
            })
            .catch(done);
    });
});