let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.timeout', function() {
        
        it('should reject with custom error object when provided', function(done) {
            let deferred = q.defer();
            let customError = new Error('Custom error object');
            customError.customProperty = 'test';
            let promise = deferred.promise.timeout(50, customError);
            
            promise.then(function(value) {
                done(new Error('Promise should have timed out'));
            }).catch(function(error) {
                assert.equal(error.message, 'Custom error object');
                assert.equal(error.customProperty, 'test');
                done();
            });
        });
        
            })
})