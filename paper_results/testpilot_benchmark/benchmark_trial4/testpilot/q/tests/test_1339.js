let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.thenResolve with delayed promise', function(done) {
        let delayedPromise = q.delay(10).then(function() {
            return 'delayed result';
        });
        let newValue = 42;
        
        q.thenResolve(delayedPromise, newValue)
            .then(function(result) {
                assert.strictEqual(result, newValue);
                done();
            })
            .catch(done);
    });
});