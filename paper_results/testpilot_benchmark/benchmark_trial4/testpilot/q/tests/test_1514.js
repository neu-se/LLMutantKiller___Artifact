let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer returns a promise-like object', function(done) {
        let testObject = { value: 42 };
        let deferred = q.defer();
        
        // Test that deferred returns an object with expected properties
        assert(typeof deferred === 'object', 'deferred should return an object');
        assert(typeof deferred.resolve === 'function', 'deferred should have resolve method');
        assert(typeof deferred.promise.then === 'function', 'deferred.promise should have then method (promise-like)');
        
        done();
    });
});