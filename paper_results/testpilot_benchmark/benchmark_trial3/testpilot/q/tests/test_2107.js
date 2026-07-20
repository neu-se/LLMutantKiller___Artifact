let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should work with non-promise values', function(done) {
        q.timeout('immediate value', 100)
            .then(result => {
                assert.equal(result, 'immediate value');
                done();
            })
            .catch(done);
    });
});