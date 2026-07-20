let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.reject - basic rejection', function(done) {
        let reason = "Test error";
        let rejectedPromise = q.Promise.reject(reason);
        
        rejectedPromise.then(
            function(value) {
                done(new Error("Promise should have been rejected, but was resolved with: " + value));
            },
            function(rejectionReason) {
                assert.strictEqual(rejectionReason, reason);
                done();
            }
        );
    });

    })