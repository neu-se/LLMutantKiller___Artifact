let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.spread with rejected promise', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        promise.spread(function(a, b, c) {
            done(new Error('Should not call fulfilled handler'));
        }, function(error) {
            assert.equal(error.message, 'Test error');
            done();
        });
        
        deferred.reject(new Error('Test error'));
    });
});