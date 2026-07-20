let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.spread with promise chain', function(done) {
        q.resolve([5, 10])
            .spread(function(a, b) {
                return [a * 2, b * 2];
            })
            .spread(function(x, y) {
                assert.equal(x, 10);
                assert.equal(y, 20);
                done();
            })
            .catch(done);
    });
});