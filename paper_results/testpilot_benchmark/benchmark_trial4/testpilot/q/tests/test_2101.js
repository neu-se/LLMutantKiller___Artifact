let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.timeout - promise rejects before timeout', function(done) {
        let deferred = q.defer();
        let timeoutPromise = q.timeout(deferred.promise, 100, new Error('Timeout error'));
        
        // Reject the promise before timeout
        setTimeout(() => {
            deferred.reject(new Error('Original rejection'));
        }, 50);
        
        timeoutPromise.then(() => {
            done(new Error('Promise should have been rejected'));
        }).catch(error => {
            assert.equal(error.message, 'Original rejection');
            done();
        });
    });
    
    })