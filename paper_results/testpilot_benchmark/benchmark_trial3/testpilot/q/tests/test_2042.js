let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.finally with resolved promise', function(done) {
        let finallyCallbackCalled = false;
        let resolvedValue = 'success';
        
        q.resolve(resolvedValue).finally(function() {
            finallyCallbackCalled = true;
        }).then(function(value) {
            assert.strictEqual(value, resolvedValue);
            assert.strictEqual(finallyCallbackCalled, true);
            done();
        }).catch(done);
    });
});