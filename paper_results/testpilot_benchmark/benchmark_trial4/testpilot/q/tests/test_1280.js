let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nodeify with resolved promise', function(done) {
        let promise = q.resolve('success');
        promise.nodeify(function(err, result) {
            assert.strictEqual(err, null);
            assert.strictEqual(result, 'success');
            done();
        });
    });
});