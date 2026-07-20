let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.spread with mixed types in array', function(done) {
        let promise = q.resolve([42, 'world', true, null]);
        
        promise.spread(function(num, str, bool, nullVal) {
            assert.equal(num, 42);
            assert.equal(str, 'world');
            assert.equal(bool, true);
            assert.equal(nullVal, null);
            done();
        }, function(error) {
            done(error);
        });
    });
});