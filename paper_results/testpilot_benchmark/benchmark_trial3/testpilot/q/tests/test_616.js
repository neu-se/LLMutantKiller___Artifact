let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.spread with resolved promises', function(done) {
        // Test spreading an array of resolved values
        q.all([q.resolve(10), q.resolve(20)])
            .spread(function(x, y) {
                assert.equal(x, 10);
                assert.equal(y, 20);
                return x + y;
            })
            .then(function(result) {
                assert.equal(result, 30);
                done();
            })
            .catch(done);
    });
});