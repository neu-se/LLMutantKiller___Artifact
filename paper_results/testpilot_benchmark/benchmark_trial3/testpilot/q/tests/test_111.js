let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer - reject with error', function(done) {
        let deferred = q.defer();
        let testError = new Error('test error');
        
        deferred.promise.then(function() {
            done(new Error('promise should not resolve'));
        }).catch(function(error) {
            assert.equal(error, testError, 'promise should reject with the correct error');
            done();
        });
        
        deferred.reject(testError);
    });
});