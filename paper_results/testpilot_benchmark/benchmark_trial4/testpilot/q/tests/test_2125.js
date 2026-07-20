let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.timeout - works with non-promise values', function(done) {
        q.timeout('immediate value', 100)
            .then(function(result) {
                assert.equal(result, 'immediate value');
                done();
            })
            .catch(done);
    });
});