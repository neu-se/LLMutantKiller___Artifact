let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fapply with empty arguments', function(done) {
        // Create a function that takes no arguments
        function getValue() {
            return 'hello world';
        }
        
        // Use q.fapply to apply the function with empty arguments array
        q.fapply(getValue, [])
            .then(function(result) {
                assert.equal(result, 'hello world');
                done();
            })
            .catch(done);
    });
});