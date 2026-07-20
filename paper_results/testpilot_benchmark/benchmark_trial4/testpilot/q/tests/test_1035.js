let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.done', function() {
        
        it('should handle unhandled errors by throwing them in next tick', function(done) {
            let promise = q.reject(new Error('unhandled error'));
            let originalOnerror = q.onerror;
            let errorCaught = false;
            
            // Set up error handler to catch the thrown error
            q.onerror = function(error) {
                errorCaught = true;
                assert.equal(error.message, 'unhandled error');
                q.onerror = originalOnerror; // restore
                done();
            };
            
            // Call done without rejection handler
            promise.done();
            
            // Give it time to throw in next tick
            setTimeout(() => {
                if (!errorCaught) {
                    q.onerror = originalOnerror; // restore
                    done(new Error('Error was not caught by Q.onerror'));
                }
            }, 20);
        });

            })
})