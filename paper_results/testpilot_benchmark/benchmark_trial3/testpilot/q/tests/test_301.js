let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with undefined values', function(done) {
        q.join(undefined, undefined).then(function(result) {
            assert.strictEqual(result, undefined);
            done();
        }).catch(done);
    });
});