let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.catch - does not trigger on success', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        let catchCalled = false;
        
        promise.then(function(value) {
            assert.equal(value, 'success');
            assert.equal(catchCalled, false);
            done();
        }).catch(function(error) {
            catchCalled = true;
            done(new Error('Catch should not be called on success'));
        });
        
        deferred.resolve('success');
    });
});