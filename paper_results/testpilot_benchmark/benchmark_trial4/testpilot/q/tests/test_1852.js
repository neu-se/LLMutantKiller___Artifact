let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fcall with multiple arguments', function(done) {
        function concatenate() {
            return Array.prototype.slice.call(arguments).join('-');
        }
        
        q.fcall(concatenate, 'hello', 'world', 'test', 123)
            .then(function(result) {
                assert.equal(result, 'hello-world-test-123');
                done();
            })
            .catch(done);
    });
});