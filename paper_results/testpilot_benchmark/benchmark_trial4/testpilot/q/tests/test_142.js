let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.defer.prototype.makeNodeResolver', function() {
        
        it('should work with falsy but non-null/undefined error values', function(done) {
            let deferred = q.defer();
            let resolver = deferred.makeNodeResolver();
            
            deferred.promise.then(function(value) {
                assert.strictEqual(value, 'success');
                done();
            });
            
            resolver(0, 'success'); // 0 is falsy but should not be treated as error
        });
    });
});