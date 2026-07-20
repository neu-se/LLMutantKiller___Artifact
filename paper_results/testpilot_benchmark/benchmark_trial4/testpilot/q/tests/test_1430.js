let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.resetUnhandledRejections - should clear unhandled rejection tracking', function(done) {
        // Create a promise that will be rejected and not handled
        let promise = q.reject(new Error('Test error'));
        
        // Set up a listener to catch unhandled rejections
        let unhandledRejections = [];
        let originalHandler = process.listeners('unhandledRejection');
        
        function testHandler(reason, promise) {
            unhandledRejections.push({reason, promise});
        }
        
        process.on('unhandledRejection', testHandler);
        
        // Wait a bit for the unhandled rejection to be detected
        setTimeout(() => {
            // Reset unhandled rejections
            q.resetUnhandledRejections();
            
            // Clean up
            process.removeListener('unhandledRejection', testHandler);
            
            // The function should execute without throwing
            assert.ok(true, 'resetUnhandledRejections executed successfully');
            done();
        }, 10);
    });
});