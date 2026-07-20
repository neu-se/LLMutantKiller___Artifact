let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fapply with multiple arguments', function(done) {
        // Create a function that concatenates strings
        function concatenateStrings(str1, str2, str3) {
            return str1 + str2 + str3;
        }
        
        // Convert it to a promise-returning function
        let promiseConcat = q.makePromise(concatenateStrings);
        
        // Test fapply with multiple arguments
        promiseConcat.fapply(['Hello', ' ', 'World'])
            .then(function(result) {
                assert.equal(result, 'Hello World');
                done();
            })
            .catch(done);
    });
});