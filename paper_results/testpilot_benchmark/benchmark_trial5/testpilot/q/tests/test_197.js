let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fcall with no arguments', function(done) {
        // Create a function that returns a constant
        function getConstant() {
            return 42;
        }
        
        // Use q.fcall to create a promise from the function
        q.fcall(getConstant)
            .then(function(result) {
                assert.strictEqual(result, 42);
                done();
            })
            .catch(done);
    });
});