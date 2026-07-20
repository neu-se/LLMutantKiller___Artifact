let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fapply with empty arguments', function(done) {
        // Create a function that takes no arguments
        function getValue() {
            return 'hello world';
        }
        
        // Use q.fcall or create a promise and use fapply on it
        let promise = q.fcall(getValue);
        
        // Test fapply with empty arguments array using q.fapply
        q.fapply(getValue, [])
            .then(function(result) {
                assert.equal(result, 'hello world');
                done();
            })
            .catch(done);
    });
});