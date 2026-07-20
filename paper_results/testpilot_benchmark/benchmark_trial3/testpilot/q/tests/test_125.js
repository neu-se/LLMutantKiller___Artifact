let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.defer.prototype.makeNodeResolver', function() {
        
        it('should reject with error when error is passed', function(done) {
            var deferred = q.defer();
            var nodeResolver = deferred.makeNodeResolver();
            var testError = new Error('test error');
            
            deferred.promise.then(function() {
                done(new Error('Promise should have been rejected'));
            }).catch(function(error) {
                assert.strictEqual(error, testError);
                done();
            });
            
            nodeResolver(testError, 'some value');
        });
        
            })
})