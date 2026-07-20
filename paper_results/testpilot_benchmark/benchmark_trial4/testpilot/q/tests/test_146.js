let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.defer.prototype.makeNodeResolver', function() {
        
        it('should resolve with array when multiple values provided', function(done) {
            let deferred = q.defer();
            let resolver = deferred.makeNodeResolver();
            
            deferred.promise.then(function(values) {
                assert(Array.isArray(values));
                assert.strictEqual(values.length, 3);
                assert.strictEqual(values[0], 'first');
                assert.strictEqual(values[1], 'second');
                assert.strictEqual(values[2], 'third');
                done();
            });
            
            resolver(null, 'first', 'second', 'third');
        });
        
    });
});