let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.any - resolves immediately with already resolved promise', function(done) {
        let resolvedPromise = q.resolve('immediate');
        let delayedPromise = q.delay(100).then(() => 'delayed');
        
        q.any([resolvedPromise, delayedPromise])
            .then(result => {
                assert.equal(result, 'immediate');
                done();
            })
            .catch(done);
    });
});