let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.defer.prototype.makeNodeResolver', function() {
        
        it('should work with falsy but defined values', function(done) {
            var deferred = q.defer();
            var nodeResolver = deferred.makeNodeResolver();
            
            deferred.promise.then(function(value) {
                assert.strictEqual(value, 0);
                done();
            }).catch(done);
            
            nodeResolver(null, 0);
        });
    });
});