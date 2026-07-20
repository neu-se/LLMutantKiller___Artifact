let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer returns a promise-like object', function(done) {
        let testObject = { value: 42 };
        let deferred = q.defer();
        
        // Test that deferred.promise is thenable (has a then method)
        assert(typeof deferred.promise.then === 'function', 'deferred.promise should have a then method');
        
        // Test that deferred has resolve method
        assert(typeof deferred.resolve === 'function', 'deferred should have resolve method');
        
        done();
    });
});