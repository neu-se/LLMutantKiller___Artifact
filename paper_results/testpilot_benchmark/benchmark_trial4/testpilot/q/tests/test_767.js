let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q promise with multiple arguments', function(done) {
        // Create a function that concatenates strings
        function concatenateStrings(str1, str2, str3) {
            return str1 + str2 + str3;
        }
        
        // Create a promise and use fapply to call the function with an array of arguments
        let promise = q.fcall(function() {
            return concatenateStrings;
        });
        
        // Test fapply with multiple arguments
        promise.fapply(['Hello', ' ', 'World'])
            .then(function(result) {
                assert.equal(result, 'Hello World');
                done();
            })
            .catch(done);
    });
});