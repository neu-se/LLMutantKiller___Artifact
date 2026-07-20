let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer.prototype.makeNodeResolver - success case', function(done) {
        var deferred = q.defer();
        var resolver = deferred.makeNodeResolver();
        
        // Simulate successful async operation
        setTimeout(function() {
            resolver(null, 'success result');
        }, 10);
        
        deferred.promise.then(function(result) {
            assert.equal(result, 'success result');
            done();
        }).catch(done);
    });
});