let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fbind with rejected promise', function(done) {
        let rejectedPromise = q.reject(new Error("Test error"));
        let boundFunc = q.fbind(rejectedPromise, "arg1");
        let result = boundFunc("arg2");
        
        q.when(result).then(function() {
            done(new Error("Should have rejected"));
        }).catch(function(error) {
            assert.equal(error.message, "Test error");
            done();
        });
    });
});