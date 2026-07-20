let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.spread with mixed values', function(done) {
        // Test spreading an array with both promises and regular values
        q.all([q.resolve('hello'), 'world', q.resolve('!')])
            .spread(function(a, b, c) {
                assert.equal(a, 'hello');
                assert.equal(b, 'world');
                assert.equal(c, '!');
                return a + ' ' + b + c;
            })
            .then(function(result) {
                assert.equal(result, 'hello world!');
                done();
            })
            .catch(done);
    });
});