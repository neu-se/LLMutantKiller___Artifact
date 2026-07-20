let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.then - fulfilled callback', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        promise.then(function(value) {
            assert.equal(value, 'test value');
            done();
        });
        
        deferred.resolve('test value');
    });
});