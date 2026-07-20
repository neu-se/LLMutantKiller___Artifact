let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fapply with multiple arguments', function(done) {
        // Create a function that concatenates strings
        function concat(str1, str2, str3) {
            return str1 + str2 + str3;
        }
        
        // Create a promise and use fapply
        let promise = q.resolve(concat);
        
        // Test fapply with multiple arguments
        promise.fapply(['Hello', ' ', 'World'])
            .then(function(result) {
                assert.equal(result, 'Hello World');
                done();
            })
            .catch(done);
    });
});