let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nbind with pre-bound arguments', function(done) {
        function multiArgFunction(a, b, c, callback) {
            setTimeout(() => {
                callback(null, a + b + c);
            }, 10);
        }
        
        const boundFunction = q.nbind(multiArgFunction, null, 1, 2);
        
        boundFunction(3)
            .then(result => {
                assert.strictEqual(result, 6);
                done();
            })
            .catch(done);
    });
});