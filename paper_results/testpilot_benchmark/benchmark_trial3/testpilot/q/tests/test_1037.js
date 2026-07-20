let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.done', function() {
        
        it('should handle unhandled errors by throwing them in next tick', function(done) {
            let promise = q.reject(new Error('unhandled error'));
            let originalOnerror = q.onerror;
            
            // Capture the error through Q.onerror
            q.onerror = function(error) {
                assert.equal(error.message, 'unhandled error');
                q.onerror = originalOnerror; // restore
                done();
            };
            
            // Call done without rejection handler - should trigger onerror
            promise.done();
        });

            })
})