let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with null values', function(done) {
        q.join(null, null).then(function(result) {
            assert.strictEqual(result, null);
            done();
        }).catch(done);
    });
});