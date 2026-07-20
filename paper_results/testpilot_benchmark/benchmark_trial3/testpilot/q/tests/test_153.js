let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer.prototype.makeNodeResolver - with multiple arguments', function(done) {
        let deferred = q.defer();
        let resolver = deferred.makeNodeResolver();
        
        // Simulate async operation returning multiple values
        setTimeout(() => {
            resolver(null, 'first', 'second', 'third');
        }, 10);
        
        deferred.promise.then(result => {
            // When multiple arguments are passed, only the first data argument is used
            assert.strictEqual(result, 'first');
            done();
        }).catch(done);
    });
});