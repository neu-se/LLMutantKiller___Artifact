let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.timeout - promise times out', function(done) {
        let deferred = q.defer();
        let customError = new Error('Custom timeout error');
        let timeoutPromise = q.timeout(deferred.promise, 50, customError);
        
        // Don't resolve the promise, let it timeout
        
        timeoutPromise.then(() => {
            done(new Error('Promise should have timed out'));
        }).catch(error => {
            assert.equal(error.message, 'Custom timeout error');
            done();
        });
    });
    
    })