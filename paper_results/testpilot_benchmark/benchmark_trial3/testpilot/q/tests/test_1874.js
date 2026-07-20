let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fbind with promise as object', function(done) {
        function multiply(a, b) {
            return a * b;
        }
        
        let boundMultiply = q.fbind(multiply, 4);
        let result = boundMultiply(7);
        
        result.then(function(value) {
            assert.equal(value, 28);
            done();
        }).catch(done);
    });
});