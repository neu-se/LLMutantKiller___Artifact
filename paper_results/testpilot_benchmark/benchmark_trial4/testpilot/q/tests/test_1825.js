let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fapply with promised function', function(done) {
        function asyncFunc(x, y) {
            return x * y;
        }
        
        let promisedFunc = q.resolve(asyncFunc);
        
        q.fapply(promisedFunc, [4, 5])
            .then(function(result) {
                assert.equal(result, 20);
                done();
            })
            .catch(done);
    });
});