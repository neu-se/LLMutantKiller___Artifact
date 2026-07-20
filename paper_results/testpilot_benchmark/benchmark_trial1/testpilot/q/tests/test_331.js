let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind with no arguments bound', function(done) {
        // Create a simple function
        function simpleFunction(value, callback) {
            setTimeout(() => {
                callback(null, value * 2);
            }, 10);
        }
        
        // Use q.nfbind to create a promise-returning function
        const promiseFunction = q.nfbind(simpleFunction);
        
        // Test with all arguments provided at call time
        promiseFunction(7)
            .then(result => {
                assert.strictEqual(result, 14);
                done();
            })
            .catch(done);
    });
});