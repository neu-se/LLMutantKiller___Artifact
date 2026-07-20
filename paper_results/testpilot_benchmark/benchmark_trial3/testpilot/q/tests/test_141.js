let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.defer.prototype.makeNodeResolver', function() {
        
        it('should reject when error is truthy (not just Error objects)', function(done) {
            let deferred = q.defer();
            let resolver = deferred.makeNodeResolver();
            let errorString = 'string error';
            
            deferred.promise.catch(function(error) {
                assert.strictEqual(error, errorString);
                done();
            });
            
            resolver(errorString);
        });
        
    });
});