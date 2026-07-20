let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.defer.prototype.makeNodeResolver', function() {
        
        it('should reject even when additional arguments are present if error is truthy', function(done) {
            var deferred = q.defer();
            var nodeResolver = deferred.makeNodeResolver();
            var testError = new Error('error with multiple args');
            
            deferred.promise.then(function() {
                done(new Error('Promise should have been rejected'));
            }).catch(function(error) {
                assert.strictEqual(error, testError);
                done();
            });
            
            nodeResolver(testError, 'arg1', 'arg2', 'arg3');
        });
        
    });
});