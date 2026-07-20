let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.allSettled', function() {
        
        it('should handle empty array', function(done) {
            q.allSettled([])
                .then(function(results) {
                    assert.equal(results.length, 0);
                    assert(Array.isArray(results));
                    done();
                })
                .catch(done);
        });

    });
});