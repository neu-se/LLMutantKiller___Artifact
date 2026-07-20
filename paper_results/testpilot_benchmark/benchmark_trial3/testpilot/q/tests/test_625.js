let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.spread with only fulfilled handler', function(done) {
        let promise = q.resolve([10, 20]);
        promise.spread(function(x, y) {
            assert.equal(x, 10);
            assert.equal(y, 20);
            done();
        });
    });
});