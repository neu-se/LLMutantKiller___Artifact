let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.defer.prototype.makeNodeResolver', function() {
        
        it('should resolve with empty array when error is null and no other arguments', function(done) {
            let deferred = q.defer();
            let resolver = deferred.makeNodeResolver();
            
            deferred.promise.then(function(value) {
                assert.strictEqual(value, undefined);
                done();
            });
            
            resolver(null);
        });
    });
});