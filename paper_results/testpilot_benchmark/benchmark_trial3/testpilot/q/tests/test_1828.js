let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fapply with immediate function', function(done) {
        // Test with a regular function (immediate reference)
        function add(a, b) {
            return a + b;
        }
        
        q.fapply(add, [3, 4])
            .then(function(result) {
                assert.equal(result, 7);
                done();
            })
            .catch(done);
    });
});