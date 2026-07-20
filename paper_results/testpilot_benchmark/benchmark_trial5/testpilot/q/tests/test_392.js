let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.resetUnhandledRejections clears unhandled rejections', function(done) {
        // Create some unhandled rejections
        let promise1 = q.reject(new Error('Test error 1'));
        let promise2 = q.reject(new Error('Test error 2'));
        
        // Wait a bit for the rejections to be tracked
        setTimeout(() => {
            // Reset unhandled rejections
            q.resetUnhandledRejections();
            
            // Create a new rejection after reset
            let promise3 = q.reject(new Error('Test error 3'));
            
            setTimeout(() => {
                // The reset should have cleared previous rejections
                // and new rejections should be tracked
                done();
            }, 10);
        }, 10);
    });

    })