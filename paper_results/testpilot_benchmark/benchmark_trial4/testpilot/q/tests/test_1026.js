let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.done with rejected callback', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        promise.done(null, function(error) {
            assert.equal(error.message, 'test error');
            done();
        });
        
        deferred.reject(new Error('test error'));
    });
    
    })