let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fapply with async function', function(done) {
        // Create an async function using Q
        function asyncMultiply(a, b) {
            return q.delay(10).then(function() {
                return a * b;
            });
        }
        
        let promisedMultiply = q.denodeify(asyncMultiply);
        
        // Test fapply with async operation
        promisedMultiply.fapply([4, 7])
            .then(function(result) {
                assert.equal(result, 28);
                done();
            })
            .catch(done);
    });
});