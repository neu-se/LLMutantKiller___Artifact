let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fapply with immediate function', function(done) {
        function testFunction(a, b, c) {
            return a + b + c;
        }
        
        q.fapply(testFunction, [1, 2, 3])
            .then(function(result) {
                assert.equal(result, 6);
                done();
            })
            .catch(done);
    });
    
});