let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.defer.prototype.makeNodeResolver', function() {
        
        it('should reject the promise when error is provided', function(done) {
            let deferred = q.defer();
            let resolver = deferred.makeNodeResolver();
            let testError = new Error('test error');
            
            deferred.promise.catch(function(error) {
                assert.strictEqual(error, testError);
                done();
            });
            
            resolver(testError);
        });
        
            })
})