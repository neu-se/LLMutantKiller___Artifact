let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fcall with multiple arguments', function(done) {
        // Create a function that concatenates strings
        function concatenate(str1, str2, str3) {
            return str1 + str2 + str3;
        }
        
        // Create a Node.js style callback function
        function concatenateAsync(str1, str2, str3, callback) {
            try {
                let result = concatenate(str1, str2, str3);
                callback(null, result);
            } catch (error) {
                callback(error);
            }
        }
        
        // Create a promise using makePromise with the callback-style function
        let promiseFunction = q.makePromise(concatenateAsync);
        
        // Test fcall with multiple arguments
        promiseFunction.fcall('Hello', ' ', 'World')
            .then(function(result) {
                assert.strictEqual(result, 'Hello World');
                done();
            })
            .catch(done);
    });
});