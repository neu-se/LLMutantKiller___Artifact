let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fapply with empty arguments', function(done) {
        // Create a function that takes no arguments
        function getValue() {
            return 'hello world';
        }
        
        let promisedGetValue = q.denodeify(getValue);
        
        // Test calling the promisified function with no arguments
        promisedGetValue()
            .then(function(result) {
                assert.equal(result, 'hello world');
                done();
            })
            .catch(done);
    });
});