let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.when with null/undefined values', function(done) {
        q.when(null, function(value) {
            assert.strictEqual(value, null);
            return q.when(undefined, function(value) {
                assert.strictEqual(value, undefined);
                done();
            });
        }).catch(done);
    });
});