let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer creates a deferred object with promise, resolve, and reject', function(done) {
        let deferred = q.defer();
        
        // Check that deferred has the expected properties
        assert(deferred.promise, 'deferred should have a promise property');
        assert(typeof deferred.resolve === 'function', 'deferred should have a resolve function');
        assert(typeof deferred.reject === 'function', 'deferred should have a reject function');
        
        done();
    });

    })