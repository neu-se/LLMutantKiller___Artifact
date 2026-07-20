let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fapply with empty arguments array', function(done) {
        // Create a function that takes no arguments
        function getValue() {
            return 'hello world';
        }
        
        // Use Q.fcall to create a promise from the function
        let promisedGetValue = q.fcall(getValue);
        
        // Test fapply with empty array
        promisedGetValue.fapply([])
            .then(function(result) {
                assert.equal(result, 'hello world');
                done();
            })
            .catch(done);
    });
});