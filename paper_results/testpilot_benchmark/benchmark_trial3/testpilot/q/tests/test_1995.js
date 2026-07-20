let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.catch with resolved promise', function(done) {
        let resolvedPromise = q.resolve('success');
        let catchCalled = false;
        
        q.catch(resolvedPromise, function(error) {
            catchCalled = true;
        }).then(function(value) {
            assert.strictEqual(value, 'success');
            assert.strictEqual(catchCalled, false);
            done();
        });
    });
});