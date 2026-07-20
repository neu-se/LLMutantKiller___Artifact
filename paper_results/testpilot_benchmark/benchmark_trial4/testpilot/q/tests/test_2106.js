let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.timeout - times out with custom error', function(done) {
        let deferred = q.defer();
        let customError = new Error('Custom timeout error');
        
        q.timeout(deferred.promise, 50, customError)
            .then(function() {
                done(new Error('Should have timed out'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Custom timeout error');
                done();
            });
    });

    })