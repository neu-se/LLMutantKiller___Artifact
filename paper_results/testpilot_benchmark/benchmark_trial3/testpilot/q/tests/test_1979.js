let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.allSettled with empty array', function(done) {
        q.allSettled([]).then(function(results) {
            assert.equal(results.length, 0);
            assert(Array.isArray(results));
            done();
        }).catch(done);
    });
});