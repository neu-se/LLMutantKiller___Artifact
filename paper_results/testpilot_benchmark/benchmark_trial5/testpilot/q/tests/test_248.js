let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.done with fulfilled callback', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        promise.done(function(value) {
            assert.equal(value, 'success');
            done();
        });
        
        deferred.resolve('success');
    });
    
    })