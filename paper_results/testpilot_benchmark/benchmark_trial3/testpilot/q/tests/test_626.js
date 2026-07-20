let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.spread with fulfilled promise returning non-array', function(done) {
        let promise = q.resolve('not an array');
        promise.spread(function(value) {
            assert.equal(value, 'not an array');
            done();
        }, function(error) {
            done(error);
        });
    });
});