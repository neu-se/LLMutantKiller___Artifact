let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.allSettled with empty array', function(done) {
        let promises = [];
        
        q(promises).allSettled().then(function(results) {
            assert.equal(results.length, 0);
            assert(Array.isArray(results));
            done();
        }).catch(done);
    });
});