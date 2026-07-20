let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.done with fulfilled promise', function(done) {
        let resolvedValue = 'test value';
        let promise = q.resolve(resolvedValue);
        
        q.done(promise, function(value) {
            assert.strictEqual(value, resolvedValue);
            done();
        }, function(error) {
            done(error);
        });
    });
});