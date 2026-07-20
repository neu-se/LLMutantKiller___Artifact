let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer basic structure', function() {
        var deferred = q.defer();
        
        // Check that defer returns an object with expected properties
        assert(typeof deferred === 'object', 'deferred should be an object');
        assert(typeof deferred.resolve === 'function', 'deferred should have resolve method');
        assert(typeof deferred.reject === 'function', 'deferred should have reject method');
        assert(typeof deferred.promise === 'object', 'deferred should have promise property');
        assert(typeof deferred.promise.then === 'function', 'promise should have then method');
    });

    })