let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.defer.prototype.makeNodeResolver', function() {
        
        it('should resolve with value when no error is passed', function(done) {
            var deferred = q.defer();
            var nodeResolver = deferred.makeNodeResolver();
            
            deferred.promise.then(function(value) {
                assert.strictEqual(value, 'test value');
                done();
            }).catch(done);
            
            nodeResolver(null, 'test value');
        });
        
    });
});