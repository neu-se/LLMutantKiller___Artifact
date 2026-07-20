let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.then - fulfilled callback', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        promise.then(function(value) {
            assert.equal(value, 42);
            done();
        }, function(error) {
            done(error);
        });
        
        deferred.resolve(42);
    });

    })