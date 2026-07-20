let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q functionality still works after noConflict', function(done) {
        // Test that q functionality works directly
        let deferred = q.defer();
        let promise = deferred.promise;
        
        promise.then(function(value) {
            assert.strictEqual(value, 'test value');
            done();
        }).catch(done);
        
        // Resolve the promise
        deferred.resolve('test value');
    });
});