let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.defer.prototype.makeNodeResolver', function() {
        
        it('should resolve with undefined when no error and no value', function(done) {
            let deferred = q.defer();
            let resolver = deferred.makeNodeResolver();
            
            deferred.promise.then(function(value) {
                assert.strictEqual(value, undefined);
                done();
            });
            
            resolver(null);
        });
        
            })
})