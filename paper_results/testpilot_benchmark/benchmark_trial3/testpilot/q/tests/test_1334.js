let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.thenResolve with resolved promise', function(done) {
        let promise = q.resolve('original value');
        let newValue = 'new value';
        
        q.thenResolve(promise, newValue)
            .then(function(result) {
                assert.strictEqual(result, newValue);
                done();
            })
            .catch(done);
    });
});