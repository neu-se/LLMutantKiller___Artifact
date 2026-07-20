let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delay with zero timeout', function(done) {
        const testObject = 'test string';
        const startTime = Date.now();
        
        q.delay(testObject, 0)
            .then(function(result) {
                const elapsed = Date.now() - startTime;
                assert.strictEqual(result, testObject);
                // Even with 0 timeout, there should be some minimal delay due to async nature
                assert(elapsed >= 0);
                done();
            })
            .catch(done);
    });
});