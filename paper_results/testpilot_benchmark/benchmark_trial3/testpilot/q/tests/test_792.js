let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fcall with multiple arguments', function(done) {
        // Create a function that concatenates strings
        function concatenate(str1, str2, str3) {
            return str1 + str2 + str3;
        }
        
        // Test fcall with multiple arguments using Q's fcall method
        q.fcall(concatenate, 'Hello', ' ', 'World')
            .then(function(result) {
                assert.strictEqual(result, 'Hello World');
                done();
            })
            .catch(done);
    });
});