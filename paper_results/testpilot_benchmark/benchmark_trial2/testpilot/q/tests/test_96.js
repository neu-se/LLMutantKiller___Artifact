let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.then - fulfilled case', function(done) {
        let deferred = q.defer();
        
        deferred.promise.then(function(value) {
            assert.equal(value, 'success');
            done();
        }, function(error) {
            done(error);
        });
        
        deferred.resolve('success');
    });
});