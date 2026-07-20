let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - all arguments pre-bound', function(done) {
        function addThree(a, b, c) {
            return a + b + c;
        }
        
        let promiseFunction = q.makePromise(addThree);
        let boundFunction = promiseFunction.fbind(null, 1, 2, 3);
        
        boundFunction()
            .then(function(result) {
                assert.equal(result, 6);
                done();
            })
            .catch(done);
    });
});