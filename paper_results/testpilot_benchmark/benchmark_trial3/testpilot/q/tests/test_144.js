let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.defer.prototype.makeNodeResolver', function() {
        
        it('should resolve with single value when no error and one value', function(done) {
            let deferred = q.defer();
            let resolver = deferred.makeNodeResolver();
            let testValue = 'test result';
            
            deferred.promise.then(function(value) {
                assert.strictEqual(value, testValue);
                done();
            });
            
            resolver(null, testValue);
        });
        
    });
});