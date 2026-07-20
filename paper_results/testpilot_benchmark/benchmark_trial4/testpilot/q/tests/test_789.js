let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fcall with multiple arguments', function(done) {
        // Create a function that concatenates strings
        function concatenate(str1, str2, str3) {
            return str1 + str2 + str3;
        }
        
        // Create a promise using q.fcall directly
        q.fcall(concatenate, 'Hello', ' ', 'World')
            .then(function(result) {
                assert.equal(result, 'Hello World');
                done();
            })
            .catch(done);
    });
});