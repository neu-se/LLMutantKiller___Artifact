let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.all - handles empty array', function(done) {
        q.all([])
            .then(function(results) {
                assert.deepEqual(results, []);
                done();
            })
            .catch(done);
    });
});