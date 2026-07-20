let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.defer.prototype.makeNodeResolver', function() {
        
        it('should resolve with undefined when only error argument is null', function(done) {
            let deferred = q.defer();
            let resolver = deferred.makeNodeResolver();
            
            deferred.promise.then(function(value) {
                assert.strictEqual(value, undefined);
                done();
            });
            
            resolver(null);
        });
        
    });
});