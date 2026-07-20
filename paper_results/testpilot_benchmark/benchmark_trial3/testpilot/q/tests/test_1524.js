let assert = require('assert');
let q = require('q');

function spread(value, fulfilled, rejected) {
    return q(value).spread(fulfilled, rejected);
}

describe('test q', function() {
    it('test q.spread with array values', function(done) {
        const arrayValue = [1, 2, 3];
        
        spread(arrayValue, function(a, b, c) {
            assert.equal(a, 1);
            assert.equal(b, 2);
            assert.equal(c, 3);
            done();
        }).catch(done);
    });
});