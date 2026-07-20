let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.defer.prototype.makeNodeResolver', function() {
        
        it('should resolve the deferred when callback is called with null error', function(done) {
            let deferred = q.defer();
            let nodeResolver = deferred.makeNodeResolver();
            
            deferred.promise.then(function(result) {
                assert.strictEqual(result, 'success');
                done();
            }).catch(done);
            
            // Simulate successful callback
            nodeResolver(null, 'success');
        });
        
    });
});