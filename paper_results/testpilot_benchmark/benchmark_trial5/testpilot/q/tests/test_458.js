let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.promised with multiple arguments', function(done) {
        // Create a callback that takes multiple arguments
        function multiArgCallback(a, b, c, callback) {
            setTimeout(() => {
                callback(null, a + b + c);
            }, 10);
        }
        
        // Convert to promised version using q.denodeify
        const promisedCallback = q.denodeify(multiArgCallback);
        
        // Test with multiple arguments
        promisedCallback(1, 2, 3)
            .then(result => {
                assert.equal(result, 6);
                done();
            })
            .catch(done);
    });
    
});