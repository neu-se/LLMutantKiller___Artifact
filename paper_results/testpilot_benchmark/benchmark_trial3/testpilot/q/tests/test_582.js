let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test isRejected with deferred promise', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        // Initially should be false (pending)
        assert.strictEqual(promise.isRejected(), false, 'Deferred promise should initially return false for isRejected()');
        
        // Reject the promise
        deferred.reject(new Error('Deferred rejection'));
        
        // Check after rejection
        setTimeout(() => {
            assert.strictEqual(promise.isRejected(), true, 'Deferred promise should return true after rejection');
            done();
        }, 0);
    });
    
    })