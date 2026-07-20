let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q unhandled rejections - should handle multiple unhandled rejections', function(done) {
        let unhandledCount = 0;
        let errors = [];
        
        // Listen for unhandled rejections
        const originalHandler = process.listeners('unhandledRejection');
        
        function unhandledRejectionHandler(reason, promise) {
            unhandledCount++;
            errors.push(reason);
        }
        
        process.on('unhandledRejection', unhandledRejectionHandler);
        
        // Create multiple unhandled rejections
        let promise1 = q.reject(new Error('error 1'));
        let promise2 = q.reject(new Error('error 2'));
        
        setTimeout(() => {
            // Check that we caught unhandled rejections
            assert(unhandledCount >= 2, 'should track multiple unhandled rejections');
            assert(errors.length >= 2, 'should collect error reasons');
            
            // Clean up - remove our handler
            process.removeListener('unhandledRejection', unhandledRejectionHandler);
            
            // Handle the promises to prevent actual unhandled rejections
            promise1.catch(() => {});
            promise2.catch(() => {});
            
            done();
        }, 10);
    });
});