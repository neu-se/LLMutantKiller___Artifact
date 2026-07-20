let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.reject - chaining with catch', function(done) {
        const originalReason = 'original error';
        const transformedReason = 'transformed error';
        
        q.Promise.reject(originalReason)
            .catch(function(reason) {
                assert.strictEqual(reason, originalReason);
                throw new Error(transformedReason);
            })
            .catch(function(reason) {
                assert.strictEqual(reason.message, transformedReason);
                done();
            })
            .catch(done);
    });
});