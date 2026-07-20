let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply - promise rejection from fapply', function(done) {
        // Create a promise that will be rejected during fapply
        let rejectedPromise = q.makePromise(function(resolve, reject) {
            reject(new Error('fapply rejection'));
        });
        
        // Override fapply to simulate a rejection
        rejectedPromise.fapply = function() {
            return q.reject(new Error('fapply failed'));
        };
        
        // Test that nfapply properly handles fapply rejections
        rejectedPromise.nfapply(['test'])
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'fapply failed');
                done();
            });
    });
});