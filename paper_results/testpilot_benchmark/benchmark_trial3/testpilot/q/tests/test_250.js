let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.reject with string reason', function(done) {
        let rejectedPromise = q.Promise.reject("Test error message");
        
        rejectedPromise.then(
            function(value) {
                // Should not reach here
                done(new Error("Promise should have been rejected"));
            },
            function(reason) {
                assert.strictEqual(reason, "Test error message");
                done();
            }
        );
    });

    })