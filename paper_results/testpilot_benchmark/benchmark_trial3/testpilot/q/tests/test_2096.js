let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.timeout - times out with default error', function(done) {
        let deferred = q.defer();
        // Never resolve the promise
        
        q.timeout(deferred.promise, 50)
            .then(function() {
                done(new Error('Should have timed out'));
            })
            .catch(function(error) {
                assert(error instanceof Error);
                assert(error.message.includes('Timed out'));
                done();
            });
    });

    })