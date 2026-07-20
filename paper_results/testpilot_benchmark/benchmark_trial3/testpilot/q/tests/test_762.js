let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fapply with async function', function(done) {
        // Create an async function using setTimeout
        function asyncMultiply(a, b, callback) {
            setTimeout(function() {
                callback(null, a * b);
            }, 10);
        }
        
        let promisedMultiply = q.denodeify(asyncMultiply);
        
        // Test fapply with async function
        promisedMultiply.fapply([4, 5])
            .then(function(result) {
                assert.equal(result, 20);
                done();
            })
            .catch(done);
    });
});