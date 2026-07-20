let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer.prototype.makeNodeResolver - success case', function(done) {
        let deferred = q.defer();
        let resolver = deferred.makeNodeResolver();
        
        // Simulate successful async operation
        setTimeout(() => {
            resolver(null, 'success result');
        }, 10);
        
        deferred.promise.then(result => {
            assert.strictEqual(result, 'success result');
            done();
        }).catch(done);
    });
});