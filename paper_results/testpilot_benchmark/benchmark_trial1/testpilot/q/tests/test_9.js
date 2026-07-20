let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.defer - basic deferred creation', function(done) {
        let deferred = q.defer();
        
        assert(deferred, 'deferred should be created');
        assert(typeof deferred.promise === 'object', 'deferred should have a promise property');
        assert(typeof deferred.resolve === 'function', 'deferred should have a resolve function');
        assert(typeof deferred.reject === 'function', 'deferred should have a reject function');
        
        done();
    });

    })