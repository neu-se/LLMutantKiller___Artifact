let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.reject with string reason', function(done) {
        let rejectedPromise = q.Promise.reject("Test error message");
        
        rejectedPromise.then(
            function(value) {
                done(new Error("Promise should have been rejected, but was resolved with: " + value));
            },
            function(reason) {
                assert.strictEqual(reason, "Test error message");
                done();
            }
        );
    });

    })