let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer - basic deferred creation', function() {
        const deferred = q.defer();
        
        assert(deferred.promise, 'deferred should have a promise property');
        assert(typeof deferred.resolve === 'function', 'deferred should have a resolve method');
        assert(typeof deferred.reject === 'function', 'deferred should have a reject method');
        assert(typeof deferred.fulfill === 'function', 'deferred should have a fulfill method');
        assert(typeof deferred.notify === 'function', 'deferred should have a notify method');
    });

    })