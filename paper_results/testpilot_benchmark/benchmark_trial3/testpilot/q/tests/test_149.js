let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer.prototype.makeNodeResolver - success case', function(done) {
        var deferred = q.defer();
        var nodeResolver = deferred.makeNodeResolver();
        
        // Simulate a successful async operation
        setTimeout(function() {
            nodeResolver(null, 'success result');
        }, 10);
        
        deferred.promise.then(function(result) {
            assert.equal(result, 'success result');
            done();
        }).catch(done);
    });
});