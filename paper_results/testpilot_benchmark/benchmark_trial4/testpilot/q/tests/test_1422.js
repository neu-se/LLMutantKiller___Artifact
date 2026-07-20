let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.resetUnhandledRejections followed by handled rejection', function(done) {
        // Create and handle a rejection before reset
        let promise1 = q.reject(new Error('Handled error'));
        promise1.catch(() => {}); // Handle it
        
        setTimeout(() => {
            q.resetUnhandledRejections();
            
            // Create another rejection and handle it
            let promise2 = q.reject(new Error('Another handled error'));
            promise2.catch(() => {
                done();
            });
        }, 10);
    });
});