let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nodeify with resolved promise', function(done) {
        let resolvedValue = 'success';
        let promise = q.resolve(resolvedValue);
        
        q.nodeify(promise, function(err, result) {
            assert.strictEqual(err, null);
            assert.strictEqual(result, resolvedValue);
            done();
        });
    });
});