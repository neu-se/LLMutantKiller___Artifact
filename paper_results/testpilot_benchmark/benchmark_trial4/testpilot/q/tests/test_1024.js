let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.finally - called on resolved promise', function(done) {
        let finallyCalled = false;
        let resolvedValue = 'success';
        
        q.resolve(resolvedValue)
            .finally(function() {
                finallyCalled = true;
            })
            .then(function(value) {
                assert.strictEqual(finallyCalled, true, 'finally callback should be called');
                assert.strictEqual(value, resolvedValue, 'resolved value should be preserved');
                done();
            })
            .catch(done);
    });
});