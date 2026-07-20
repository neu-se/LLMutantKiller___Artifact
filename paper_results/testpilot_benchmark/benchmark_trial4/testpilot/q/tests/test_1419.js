let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.resetUnhandledRejections can be called multiple times', function(done) {
        // Create some rejections
        let promise1 = q.reject(new Error('Error 1'));
        
        setTimeout(() => {
            // Reset multiple times
            q.resetUnhandledRejections();
            q.resetUnhandledRejections();
            q.resetUnhandledRejections();
            
            // Should not throw any errors
            done();
        }, 10);
    });

    })