let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.all - resolves with empty array for empty input', function(done) {
        q.all([])
            .then(function(results) {
                assert.deepEqual(results, []);
                done();
            })
            .catch(done);
    });
});