let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.finally preserves original rejection even if callback succeeds', function(done) {
        let originalError = new Error('original error');
        let finallyCallbackCalled = false;
        
        q.finally(q.reject(originalError), function() {
            finallyCallbackCalled = true;
            return 'callback success';
        }).then(function() {
            done(new Error('Promise should have been rejected with original error'));
        }).catch(function(error) {
            assert.strictEqual(error, originalError);
            assert.strictEqual(finallyCallbackCalled, true);
            done();
        });
    });
});