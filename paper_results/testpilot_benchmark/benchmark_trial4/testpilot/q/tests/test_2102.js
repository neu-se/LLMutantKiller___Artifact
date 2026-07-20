let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.timeout - with default timeout error', function(done) {
        let deferred = q.defer();
        let timeoutPromise = q.timeout(deferred.promise, 50);
        
        // Don't resolve the promise, let it timeout with default error
        
        timeoutPromise.then(() => {
            done(new Error('Promise should have timed out'));
        }).catch(error => {
            assert(error instanceof Error);
            done();
        });
    });
    
    })