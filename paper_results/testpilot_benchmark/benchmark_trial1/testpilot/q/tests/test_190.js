let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - all arguments pre-bound', function(done) {
        function addThree(a, b, c) {
            return a + b + c;
        }
        
        let promiseFunction = q.makePromise(addThree);
        let boundFunction = promiseFunction.fbind(null, 5, 10, 15);
        
        boundFunction()
            .then(function(result) {
                assert.equal(result, 30); // 5 + 10 + 15 = 30
                done();
            })
            .catch(done);
    });
});