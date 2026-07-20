let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q promise rejection handling', function(done) {
        // Create a rejected promise and handle it immediately
        let rejectedPromise = q.reject(new Error('handled error'));
        let handledCorrectly = false;
        
        rejectedPromise.catch((error) => {
            // This rejection is handled
            handledCorrectly = true;
            assert(error.message === 'handled error', 'Error message should match');
        });
        
        // Give it a moment to process
        setTimeout(() => {
            assert(handledCorrectly, 'Promise rejection should have been handled');
            done();
        }, 10);
    });
});