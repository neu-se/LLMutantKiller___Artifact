let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spread with fulfilled promise and array value', function(done) {
        let promise = q.resolve([1, 2, 3]);
        
        promise.spread(function(a, b, c) {
            assert.equal(a, 1);
            assert.equal(b, 2);
            assert.equal(c, 3);
            done();
        }).catch(function(error) {
            done(error);
        });
    });
});