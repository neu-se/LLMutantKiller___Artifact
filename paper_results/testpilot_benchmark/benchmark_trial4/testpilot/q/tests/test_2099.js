let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.timeout - promise resolves before timeout', function(done) {
        let deferred = q.defer();
        let timeoutPromise = q.timeout(deferred.promise, 100, new Error('Timeout error'));
        
        // Resolve the promise before timeout
        setTimeout(() => {
            deferred.resolve('success');
        }, 50);
        
        timeoutPromise.then(result => {
            assert.equal(result, 'success');
            done();
        }).catch(done);
    });
    
    })