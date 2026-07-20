let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.thenResolve with resolved promise', function(done) {
        let resolvedPromise = q.resolve('original value');
        let newValue = 'new value';
        
        q.thenResolve(resolvedPromise, newValue)
            .then(function(result) {
                assert.strictEqual(result, newValue);
                done();
            })
            .catch(done);
    });
});