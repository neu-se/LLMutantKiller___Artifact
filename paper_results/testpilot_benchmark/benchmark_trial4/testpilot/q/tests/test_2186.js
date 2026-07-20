let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nfapply with multiple return values', function(done) {
        // Create a callback that returns multiple values
        function multiValueCallback(callback) {
            setTimeout(() => {
                callback(null, 'first', 'second', 'third');
            }, 10);
        }
        
        q.nfapply(multiValueCallback, [])
            .then(result => {
                // q.nfapply should only return the first value after error
                assert.strictEqual(result, 'first');
                done();
            })
            .catch(done);
    });
    
    })