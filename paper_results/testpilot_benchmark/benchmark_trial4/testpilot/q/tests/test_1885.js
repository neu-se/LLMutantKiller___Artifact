let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fbind with rejected promise', function(done) {
        // Create a function that returns a rejected promise
        let funcThatRejects = function() {
            return q.reject(new Error("Test error"));
        };
        
        // Use q.fbind to bind the function with arguments
        let boundFunc = q.fbind(funcThatRejects, "arg1");
        let result = boundFunc("arg2");
        
        q.when(result).then(function() {
            done(new Error("Should have rejected"));
        }).catch(function(error) {
            assert.equal(error.message, "Test error");
            done();
        });
    });
});