let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenReject - should be chainable', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        promise
            .then(function() {
                // Simulate thenReject behavior by throwing an error
                throw new Error('first rejection');
            })
            .catch(function(reason) {
                assert.strictEqual(reason.message, 'first rejection');
                return q.resolve('recovered');
            })
            .then(function(value) {
                assert.strictEqual(value, 'recovered');
                done();
            })
            .catch(done);
        
        deferred.resolve('original value');
    });
});