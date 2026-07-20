let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer.prototype.makeNodeResolver - with multiple success values', function(done) {
        let deferred = q.defer();
        let resolver = deferred.makeNodeResolver();
        
        // Simulate callback with multiple values
        resolver(null, 'first', 'second', 'third');
        
        deferred.promise.then(function(result) {
            // When multiple values are passed, only the first one is used
            assert.equal(result, 'first');
            done();
        }).catch(done);
    });
});