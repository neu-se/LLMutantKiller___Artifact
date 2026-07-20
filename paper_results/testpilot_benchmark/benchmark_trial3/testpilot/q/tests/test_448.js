let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.then - no callbacks provided', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        promise.then().then(function(value) {
            assert.equal(value, 'test value');
            done();
        });
        
        deferred.resolve('test value');
    });

    })