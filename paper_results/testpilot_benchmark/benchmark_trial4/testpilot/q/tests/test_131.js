let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.defer.prototype.makeNodeResolver', function() {
        
        it('should resolve with undefined when only error argument is passed as null', function(done) {
            var deferred = q.defer();
            var nodeResolver = deferred.makeNodeResolver();
            
            deferred.promise.then(function(value) {
                assert.strictEqual(value, undefined);
                done();
            }).catch(done);
            
            nodeResolver(null);
        });
        
            })
})